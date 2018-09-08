const HttpStatus = require('http-status-codes');
const Employee = require('../models/employeeModel');
module.exports = {
  createEmployee(req, res) {
    const body = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
      office: req.body.office,
      address: req.body.address
    };
    Employee.create(body)
      .then(() => {
        res.status(HttpStatus.CREATED).json({
          message: 'Create sucessfully'
        });
      })
      .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: err
        });
      });
  },
  getAllEmployees(req, res) {
    Employee.find()
      .then(response => {
        res.status(HttpStatus.OK).json({
          message: 'fetched all employees',
          response
        });
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: err
        });
      });
  }
};
