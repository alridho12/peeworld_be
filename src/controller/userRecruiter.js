const {
  findEmail,
  findId,
  create,
  selectAllRecruiter,
  selectRecuiter,
  updateRecruiter,
  searchRecruiter,
  countData,
  createUsersVerification,
  checkUsersVerification,
  cekUser,
  deleteUsersVerification,
  updateAccountVerification,
} = require("../model/userRecruiter");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");
const cloudinary = require("../middleware/cloudinary");
const crypto = require("crypto");
const sendEmailUser = require("../middleware/sendEmailUser");


const userRecruiterController = {
  getAllUser: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "nama";
      const sort = req.query.sort?.toUpperCase() || "ASC"; // optional chaining
      const search = req.query.search || "";

      if (search) {
        result = await searchRecruiter(search, limit, offset, sortby, sort);
        count = await countData(search);
      } else {
        result = await selectAllRecruiter(limit, offset, sortby, sort);
        count = await countData();
      }

      const totalData = parseInt(count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      commonHelper.response(
        res,
        result.rows,
        200,
        "get data success ",
        pagination
      );
    } catch (err) {
      console.log(err);
    }
  },

  getDetailRecruiter: async (req, res) => {
    const id = req.params.recruiter_id;
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return res.json({ message: "ID is Not Found" });
    }
    selectRecuiter(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => res.send(err));
  },

  updateRecruiter: async (req, res) => {
    const id = req.params.recruiter_id;
    const {
      email_perusahaan,
      nama_perusahaan,
      jabatan,
      handphone,
      deskripsi_perusahaan,
      domisili
    } = req.body;

    try {
      const { rowCount } = await findId(id);
      if (!rowCount) return res.json({ message: "Worker Not Found!" });

      let photo_profile = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        photo_profile = result.secure_url;
      }

      const data = {
        id,
        email_perusahaan,
        nama_perusahaan,
        jabatan,
        handphone,
        deskripsi_perusahaan,
        domisili,
        photo_profile
      };

      const result = await updateRecruiter(data);
      commonHelper.response(res, result.rows, 200, 'Worker profile updated successfully');
    } catch (err) {
      console.log(err);
      commonHelper.response(res, null, 500, 'Error while updating worker data');
    }
  },

  registerRecruiter: async (req, res) => {
    const { nama, email, handphone, password, nama_perusahaan, jabatan } = req.body;
    const { rowCount } = await findEmail(email);
    if (rowCount) {
      return res.json({ message: "email is already taken" });
    }
    const passwordHash = bcrypt.hashSync(password);
    const id = uuidv4();

    const verify = "false";

    const data = {
      id,
      email,
      passwordHash,
      nama,
      handphone,
      nama_perusahaan,
      jabatan,
      role: "recruiter",
      verify
    };

    // verification


    const users_verification_id = uuidv4().toLocaleLowerCase();
    const users_id = id;
    const token = crypto.randomBytes(64).toString("hex");

    // url localhost
    const url = `${process.env.BASE_URL}recruiter/verify?id=${users_id}&token=${token}`;

    //send email
    await sendEmailUser(nama, email, 'Email Verification for Peworld Account', url);
    create(data)

    // insert db table verification
    await createUsersVerification(
      users_verification_id,
      users_id,
      token
    )


      .then((result) => {
        commonHelper.response(res, result.rows, 200, "email is created");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  VerifyAccount: async (req, res) => {
    try {
      const queryUsersId = req.query.id;
      const queryToken = req.query.token;

      if (typeof queryUsersId === 'string' && typeof queryToken === 'string') {
        const checkUsersVerify = await selectRecuiter(queryUsersId);

        if (checkUsersVerify.rowCount == 0) {
          return commonHelper.response(res, null, 403, 'Error users has not found');
        }
        
        console.log(checkUsersVerify);

        if (checkUsersVerify.rows[0].verify != 'false') {
          return commonHelper.response(res, null, 403, 'Users has been verified');
        }

        const result = await checkUsersVerification(queryUsersId, queryToken);

        if (result.rowCount == 0) {
          return commonHelper.response(res, null, 403, 'Error invalid credential verification');
        } else {
          await updateAccountVerification(queryUsersId);
          await deleteUsersVerification(queryUsersId, queryToken);
          commonHelper.response(res, null, 200, 'Users verified succesful');
        }
      } else {
        return commonHelper.response(res, null, 403, 'Invalid url verification');
      }
    } catch (error) {
      console.log(error);
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    const {
      rows: [user],
    } = await findEmail(email);
    if (!user) {
      return res.json({ message: "email is incorrect" });
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.json({ message: "passowrd is incorrect" });
    }

    const {
      rows: [verify],
    } = await cekUser(email);
    if (verify.verify === 'false') {
      return res.json({
        message: 'Account is unverify, please check your email for verification.',
      });
    }

    delete user.password;
    const payload = {
      email: user.email,
    };
    user.token = authHelper.generateToken(payload);
    user.refreshToken = authHelper.refreshToken(payload);
    commonHelper.response(res, user, 201, "login is successful");
  },
  profile: async (req, res) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refershToken: authHelper.refreshToken(payload),
    };
    commonHelper.response(res, result, 200, "token is already generate");
  },

  selectAllRecruiter: async (req, res) => {
    try {
      const users = await selectAllRecruiter();
      commonHelper.response(res, users.rows, 200, "Get all users success");
    } catch (err) {
      console.log(err);
      commonHelper.response(res, null, 500, "Internal server error");
    }
  },
};

module.exports = userRecruiterController;
