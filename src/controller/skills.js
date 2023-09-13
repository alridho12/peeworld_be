const {
    selectAllSkills,
    searchSkills,
    selectSkills,
    countData,
    showSkillByUserId,
    insertSkills,
    findId,
    findName,
    deleteSkills,
    updateSkills
} = require("../model/skills");

const commonHelper = require("../helper/common");
// const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
// const authHelper = require('../helper/auth');
// const jwt = require('jsonwebtoken');

const skillsController = {

    getAllSkills: async (req, res) => {
        try {
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 5
            const offset = (page - 1) * limit
            const sortby = req.query.sortby || 'skill_name'
            const sort = req.query.sort?.toUpperCase() || 'ASC' // optional chaining
            const search = req.query.search || ''

            if (search) {
                result = await searchSkills(search, limit, offset, sortby, sort)
                count = await countData(search)
            } else {
                result = await selectAllSkills(limit, offset, sortby, sort)
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

    getSkillUser: async (req, res) => {
        try {
            const worker_id = req.params.worker_id;
            const result = await showSkillByUserId(worker_id);
            if (!result.rowCount) return commonHelper
                .response(res, null, 202, "User no havent skill");


            commonHelper.response(res, result.rows, 200,
                "Get user skills");
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed getting user skills");
        }
    },


    getDetailSkills: async (req, res) => {
        const id = req.params.skill_worker_id;
        const { rowCount } = await findId(id);
        if (!rowCount) {
            return res.json({ message: "ID is Not Found" })
        }
        selectSkills(id)
            .then((result) => {
                commonHelper.response(res, result.rows, 200, "get data success");
            })
            .catch((err) => res.send(err));
    },


    updateSkills: async (req, res) => {
        const id = req.params.skill_worker_id;
        const worker_id = req.payload.worker_id;
        const { skill_name } = req.body;

        const { rowCount } = await findId(id);
        if (!rowCount) return res.json({ message: "skill not exist!" });

        const data = {
            skill_worker_id,
            skill_name,
            worker_id
        };
        updateSkills(data).then(result => {
            commonHelper.response(res, result.rows, 201, "Data Worker Updated!");
        }).catch(error => {
            res.send(error);
        })
    },


    deleteSkills: async (req, res) => {
        try {
            const id = req.params.skill_worker_id;
            const { rowCount } = await findId(id);

            if (!rowCount) {
                return res.json({ message: "Skills not Found" })
            }
            deleteSkills(id)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Skill deleted")
                )
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    },

    inputSkills: async (req, res) => {
        const { skill_name, worker_id } = req.body;
        console.log(req.body);
        const { rowCount } = await findName(skill_name, worker_id);

        if (rowCount) {
            return res.json({ message: 'skills is already taken' })
        }
        const id = uuidv4();
        const data = {
            id,
            worker_id,
            skill_name,
        }

        insertSkills(data)
            .then(result => {
                commonHelper.response(res, result.rows, 201, "Data Skill Created")
            })
            .catch(error => {
                res.send(error)
            })
    }

};

module.exports = skillsController;