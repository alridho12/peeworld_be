const {
  selectAllExperience,
  searchExperience,
  selectExperience,
  countData,
  showExperienceByUserId,
  insertExperience,
  findId,
  findName,
  deleteExperience,
  updateExperience,
} = require("../model/experience");

const commonHelper = require("../helper/common");
// const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require("uuid");
// const authHelper = require('../helper/auth');
// const jwt = require('jsonwebtoken');

const experienceController = {
  getAllExperience: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "posisi";
      const sort = req.query.sort?.toUpperCase() || "ASC"; // optional chaining
      const search = req.query.search || "";

      if (search) {
        result = await searchExperience(search, limit, offset, sortby, sort);
        count = await countData(search);
      } else {
        result = await selectAllExperience(limit, offset, sortby, sort);
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

  getExperienceUser: async (req, res) => {
    try {
      const worker_id = req.params.worker_id;
      const result = await showExperienceByUserId(worker_id);
      if (!result.rowCount)
        return commonHelper.response(res, null, 202, "User no experience");

      commonHelper.response(res, result.rows, 200, "Get user experience");
    } catch (error) {
      console.log(error);
      commonHelper.response(res, null, 500, "Failed getting user experience");
    }
  },

  getDetailExperience: async (req, res) => {
    const id = req.params.experience_id;
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return res.json({ message: "ID is Not Found" });
    }
    selectExperience(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => res.send(err));
  },

  updateExperience: async (req, res) => {
    const id = req.params.experience_id;
    const {
      posisi,
      nama_perusahaan,
      tanggal_mulai,
      tanggal_selesai,
      deskripsi_kerja,
    } = req.body;

    const { rowCount } = await findId(id);
    if (!rowCount) return res.json({ message: "experience not exist!" });

    const data = {
      experience_id: id,
      posisi,
      nama_perusahaan,
      tanggal_mulai,
      tanggal_selesai,
      deskripsi_kerja,
    };
    updateExperience(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, "Data Worker Updated!");
      })
      .catch((error) => {
        res.send(error);
      });
  },

  deleteExperience: async (req, res) => {
    try {
        const id = req.params.experience_id;
        const { rowCount } = await findId(id);

        if (!rowCount) {
            return res.json({ message: "experience not Found" })
        }
        deleteExperience(id)
            .then((result) =>
                commonHelper.response(res, result.rows, 200, "experience deleted")
            )
            .catch((err) => res.send(err));
    } catch (error) {
        console.log(error);
    }
},

  inputExperience: async (req, res) => {
    const {
      posisi,
      nama_perusahaan,
      tanggal_mulai,
      tanggal_selesai,
      deskripsi_kerja,
      worker_id
    } = req.body;
    const { rowCount } = await findName(posisi, worker_id);

    if (rowCount) {
      return res.json({ message: "skills is already taken" });
    }
    const id = uuidv4();
    const data = {
      id,
      posisi,
      nama_perusahaan,
      tanggal_mulai,
      tanggal_selesai,
      deskripsi_kerja,
      worker_id
    };

    insertExperience(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, "Data experience Created");
      })
      .catch((error) => {
        res.send(error);
      });
  },
};

module.exports = experienceController;
