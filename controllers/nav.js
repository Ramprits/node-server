const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const NAV = require('../models/navModel');
const helper = require('../helper/helper');
const bcrypt = require('bcryptjs');
const secrettoken = require('../middleware/db');

module.exports = {
  addnavigation(req, res) {
    const body = {
      label: req.body.post,
      url: req.body.url,
      routerLink: req.body.routerLink,
      icon: req.body.icon
    };
    NAV.create(body)
      .then(post => {
        res.status(HttpStatus.CREATED).json({ message: 'Create sucessfully' });
      })
      .catch(error => {
        console.log(error);
      });
  },

  getAllMenus(req, res, next) {
    NAV.find()
      .then(response => {
        res.status(HttpStatus.OK).json({
          message: 'menus fetched sucessfully!',
          response
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
};
