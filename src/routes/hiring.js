const express = require('express');
const hireController = require('../controller/hiring');
const router = express.Router();

router
.post('/', hireController.createHire)
.get('/', hireController.getAllHire)
.get('/worker/:id', hireController.getSelectHireWorker)
.get('/recruiter/:id', hireController.getSelectHireRecruiter)
.delete('/:id', hireController.deleteHire);
module.exports = router;