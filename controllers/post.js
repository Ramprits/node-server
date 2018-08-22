const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const Post = require('../models/postModel');
const helper = require('../helper/helper');
const bcrypt = require('bcryptjs');
const secrettoken = require('../middleware/db');

module.exports = {
  addPost(req, res) {
    const schema = Joi.object().keys({
      username: Joi.string().required()
    });
   
    const body = {
      user: req.user._id,
      post: req.body.post,
      username: req.user.username,
      created: new Date()
    };

    Post.create(body)
      .then(post => {
        res.status(HttpStatus.CREATED).json({ message: 'Create sucessfully' });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
