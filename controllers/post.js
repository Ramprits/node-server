const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const Post = require('../models/postModel');
const helper = require('../helper/helper');
const bcrypt = require('bcryptjs');
const secrettoken = require('../middleware/db');

module.exports = {
  addPost(req, res) {
    const body = {
      post: req.body.post
    };

    console.log(body);

    Post.create(body)
      .then(post => {
        res.status(HttpStatus.CREATED).json({ message: 'Create sucessfully' });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
