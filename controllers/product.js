const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const Product = require('../models/postModel');
const helper = require('../helper/helper');
const bcrypt = require('bcryptjs');
const secrettoken = require('../middleware/db');

module.exports = {
  async addproduct(req, res) {
    const body = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image
    };
    await Product.create(body)
      .then(post => {
        res.status(HttpStatus.CREATED).json({ message: 'Create sucessfully' });
      })
      .catch(error => {
        console.log(error);
      });
  },

  async getAllProducts(req, res, next) {
    await Product.find()
      .then(response => {
        res.status(HttpStatus.OK).json({
          message: 'sucessfully',
          response
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }
};
