const express = require('express')
const router = express.Router()
const portofolioController = require('../controller/portofolio')
const uploadPorto = require ('../middleware/uploadPorto')
const {protect} = require('../middleware/auth')

router.get("/", portofolioController.getAllPortofolio);
router.get("/worker/:worker_id", portofolioController.getPortofolioUser)
router.get("/detail/:portofolio_id", portofolioController.getDetailPortofolio);
router.post('/addporto',uploadPorto, portofolioController.insertPortofolio);
router.delete("/delete/:portofolio_id", portofolioController.deletePortofolio);
router.put("/update/:portolio_id", portofolioController.updatePortofolio);

module.exports = router