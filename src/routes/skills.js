const express = require('express')
const router = express.Router()
const skillsController = require('../controller/skills')
const {protect} = require('../middleware/auth')

router.get("/", skillsController.getAllSkills);
router.get("/worker/:worker_id", skillsController.getSkillUser)
router.get("/detail/:skill_worker_id", skillsController.getDetailSkills);
router.post('/addskills', skillsController.inputSkills);
router.delete("/delete/:skill_worker_id", skillsController.deleteSkills);
router.put("/update/:skill_worker_id", skillsController.updateSkills);

module.exports = router
