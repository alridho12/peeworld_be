const express = require('express')
const router = express.Router()
const userRouter = require('../routes/users')
const skillsRouter = require('../routes/skills')
const experienceRouter = require('../routes/experience')
const portofolioRouter = require('../routes/portofolio')
const userRecruiterRouter = require('../routes/userRecruiter')
const hiringRouter = require('../routes/hiring')

router.use('/hiring',hiringRouter)
router.use('/users', userRouter)
router.use('/skills', skillsRouter)
router.use('/experience',experienceRouter)
router.use('/portofolio',portofolioRouter)
router.use('/recruiter',userRecruiterRouter)
module.exports = router