const express = require('express')
const router = express.Router()
const recruiterController = require('../controller/userRecruiter')
const uploadProfileRecruiter = require("../middleware/uploadProfileRecruiter");

router
  .get('/verify', recruiterController.VerifyAccount)
  .post('/register', recruiterController.registerRecruiter)
  .post('/login', recruiterController.loginUser)
  .get('/:recruiter_id', recruiterController.getDetailRecruiter)
  .post('/refreshToken', recruiterController.refreshToken)
  .get('/', recruiterController.getAllUser)
  .put('/:recruiter_id', uploadProfileRecruiter, recruiterController.updateRecruiter)

module.exports = router