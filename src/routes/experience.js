const express = require('express')
const router = express.Router()
const experienceController = require('../controller/experience')
const {protect} = require('../middleware/auth')

router.get("/", experienceController.getAllExperience);
router.get("/worker/:worker_id", experienceController.getExperienceUser)
router.get("/detail/:experience_id", experienceController.getDetailExperience);
router.post('/addexperience', experienceController.inputExperience);
router.delete("/delete/:experience_id", experienceController.deleteExperience);
router.put("/update/:experience_id", experienceController.updateExperience);

module.exports = router