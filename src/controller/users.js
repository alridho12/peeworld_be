const { findEmail,
  findId,
  create,
  selectAllWorker,
  selectWorker,
  updateWorker,
  searchWorker,
  countData } = require('../model/users')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const authHelper = require('../helper/auth')
const commonHelper = require('../helper/common')
const cloudinary = require("../middleware/cloudinary");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 10
      const offset = (page - 1) * limit
      const sortby = req.query.sortby || 'nama'
      const sort = req.query.sort?.toUpperCase() || 'ASC' // optional chaining
      const search = req.query.search || ''

      if (search) {
        result = await searchWorker(search, limit, offset, sortby, sort)
        count = await countData(search)
      } else {
        result = await selectAllWorker(limit, offset, sortby, sort)
        count = await countData()
      }

      const totalData = parseInt(count)
      const totalPage = Math.ceil(totalData / limit)
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage
      }

      commonHelper.response(
        res,
        result.rows,
        200,
        'get data success ',
        pagination
      )
    } catch (err) {
      console.log(err)
    }
  },

  getDetailWorker: async (req, res) => {
    const id = req.params.worker_id;
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return res.json({ message: "ID is Not Found" })
    }
    selectWorker(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => res.send(err));
  },

  updateWorker: async (req, res) => {
    const id = req.params.worker_id;
    const { 
      nama,
      jobdesk,
      domisili,
      tempatkerja,
      deskripsidiri 
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
        nama,
        jobdesk,
        domisili,
        tempatkerja,
        deskripsidiri,
        photo_profile
      };

      const result = await updateWorker(data);
      commonHelper.response(res, result.rows, 200, 'Worker profile updated successfully');
    } catch (err) {
      console.log(err);
      commonHelper.response(res, null, 500, 'Error while updating worker data');
    }
  },

  registerUser: async (req, res) => {
    const { nama, email, handphone, password } = req.body
    const { rowCount } = await findEmail(email)
    if (rowCount) {
      return res.json({ message: 'email is already taken' })
    }
    const passwordHash = bcrypt.hashSync(password)
    const id = uuidv4()
    const data = {
      id,
      email,
      passwordHash,
      nama,
      handphone,
      role: "worker"
    }
    create(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, 'email is created')
      })
      .catch((err) => {
        console.log(err)
      })
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body
    const {
      rows: [user]
    } = await findEmail(email)
    if (!user) {
      return res.json({ message: 'email is incorrect' })
    }
    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) {
      return res.json({ message: 'passowrd is incorrect' })
    }
    delete user.password
    const payload = {
      email: user.email,
    }
    user.token = authHelper.generateToken(payload)
    user.refreshToken = authHelper.refreshToken(payload)
    commonHelper.response(res, user, 201, 'login is successful')
  },
  profile: async (req, res) => {
    const email = req.payload.email
    const {
      rows: [user]
    } = await findEmail(email)
    delete user.password
    commonHelper.response(res, user, 200)
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT)
    const payload = {
      email: decoded.email
    }
    const result = {
      token: authHelper.generateToken(payload),
      refershToken: authHelper.refreshToken(payload)
    }
    commonHelper.response(res, result, 200, 'token is already generate')
  },

  selectAllWorker: async (req, res) => {
    try {
      const users = await selectAllWorker()
      commonHelper.response(res, users.rows, 200, 'Get all users success')
    } catch (err) {
      console.log(err)
      commonHelper.response(res, null, 500, 'Internal server error')
    }
  }
}

module.exports = userController
