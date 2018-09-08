const express = require('express');
const router = express.Router();
const employeeCtrl = require('../controllers/employee');

router.post('/', employeeCtrl.createEmployee);
router.get('/', employeeCtrl.getAllEmployees);

module.exports = router;
