const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const User = require('../models/userModel');
const helper = require('../helper/helper');
const bcrypt = require('bcryptjs');
const secrettoken = require('../middleware/db');
const jwt = require('jsonwebtoken');

module.exports = {
  async createUser(req, res) {
    const schema = Joi.object().keys({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string()
        .min(3)
        .max(30),
      email: Joi.string()
        .email()
        .required()
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
    }

    const useemail = await User.findOne({
      email: helper.lowerCase(req.body.email)
    });

    const username = await User.findOne({
      username: helper.firstUpper(req.body.username)
    });

    if (useemail) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: 'Email address already exists!' });
    }

    if (username) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: 'user name already exists!' });
    }

    return bcrypt.hash(value.password, 10, function(err, hash) {
      if (err) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Error hashing password' });
      }

      const body = {
        username: helper.firstUpper(value.username),
        email: helper.lowerCase(value.email),
        password: hash
      };

      User.create(body)
        .then(user => {
          const token = jwt.sign({ data: user }, secrettoken.jwtTken, {
            expiresIn: 120
          });
          res.status(HttpStatus.CREATED).json({
            message: 'User created sucessfully',
            user,
            token
          });
        })
        .catch(error => {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'Error ocured!' });
        });
    });
  },

  async LoginUser(req, res) {
    if (!req.body.username || !req.body.password) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'No empty fields allowed' });
    }

    await User.findOne({ username: helper.firstUpper(req.body.username) })
      .then(user => {
        if (!user) {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ message: 'Username not fount!' });
        }
        return bcrypt.compare(req.body.password, user.password).then(result => {
          if (!result) {
            return res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'Password is incorrect' });
          }
          const token = jwt.sign({ data: user }, secrettoken.jwtTken, {
            expiresIn: '5h'
          });
          res.cookie('auth', token);
          return res
            .status(HttpStatus.OK)
            .json({ message: 'Login successful', user, token });
        });
      })
      .catch(err => {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error occured' });
      });
  }
};
