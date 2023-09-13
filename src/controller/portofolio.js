const cloudinary = require('../middleware/cloudinary')
const {
    selectAllPortofolio,
    searchPortofolio,
    showPortofolioByUserId,
    selectPortofolio,
    insertPortofolio,
    updatePortofolio,
    deletePortofolio,
    countData,
    findId,
} = require("../model/portofolio");

const commonHelper = require("../helper/common");
// const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require("uuid");
// const authHelper = require('../helper/auth');
// const jwt = require('jsonwebtoken');

const portofolioController = {
    getAllPortofolio: async (req, res) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5;
            const offset = (page - 1) * limit;
            const sortby = req.query.sortby || "nama_aplikasi";
            const sort = req.query.sort?.toUpperCase() || "ASC"; // optional chaining
            const search = req.query.search || "";

            if (search) {
                result = await searchPortofolio(search, limit, offset, sortby, sort);
                count = await countData(search);
            } else {
                result = await selectAllPortofolio(limit, offset, sortby, sort);
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

    getPortofolioUser: async (req, res) => {
        try {
            const worker_id = req.params.worker_id;
            const result = await showPortofolioByUserId(worker_id);
            if (!result.rowCount)
                return commonHelper.response(res, null, 202, "User no havent skill");

            commonHelper.response(res, result.rows, 200, "Get user skills");
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed getting user skills");
        }
    },

    getDetailPortofolio: async (req, res) => {
        const id = req.params.skill_worker_id;
        const { rowCount } = await findId(id);
        if (!rowCount) {
            return res.json({ message: "ID is Not Found" });
        }
        selectPortofolio(id)
            .then((result) => {
                commonHelper.response(res, result.rows, 200, "get data success");
            })
            .catch((err) => res.send(err));
    },

    updatePortofolio: async (req, res) => {
        const id = req.params.portofolio_id;
        const { skill_name } = req.body;

        const { rowCount } = await findId(id);
        if (!rowCount) return res.json({ message: "skill not exist!" });

        const data = {
            portofolio_id,
            skill_name,
            worker_id,
        };
        updatePortofolio(data)
            .then((result) => {
                commonHelper.response(res, result.rows, 201, "Data Worker Updated!");
            })
            .catch((error) => {
                res.send(error);
            });
    },

    deletePortofolio: async (req, res) => {
        try {
            const id = req.params.portofolio_id;
            const { rowCount } = await findId(id);

            if (!rowCount) {
                return res.json({ message: "Skills not Found" });
            }
            deletePortofolio(id)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Skill deleted")
                )
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    },

    insertPortofolio: async (req, res) => {
        const { nama_aplikasi, link_repository, worker_id } = req.body;
        console.log(req.body);
        const id = uuidv4();
        let photo_porto = null;
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          photo_porto = result.secure_url;
        }
    
        const data = {
          id,
          nama_aplikasi,
          link_repository,
          photo_porto,
          worker_id,
        };
        insertPortofolio(data)
          .then((result) =>
            commonHelper.response(
              res,
              result.rows,
              201,
              "Create Portofolio Success"
            )
          )
          .catch((err) => res.send(err));
      },
    
};

module.exports = portofolioController;
