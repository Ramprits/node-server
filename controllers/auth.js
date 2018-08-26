const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const User = require('../models/userModel');
const helper = require('../helper/helper');
const bcrypt = require('bcryptjs');
const secrettoken = require('../middleware/db');
const jwt = require('jsonwebtoken');
const Msg = require('../middleware/message');
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
      return res.status(HttpStatus.CONFLICT).json({ message: Msg.EMAILEXIST });
    }

    if (username) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: Msg.USERALREADEXIST });
    }

    return bcrypt.hash(value.password, 10, function(err, hash) {
      if (err) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: Msg.ERRORHASHINGPWD });
      }

      const body = {
        username: helper.firstUpper(value.username),
        email: helper.lowerCase(value.email),
        password: hash
      };

      User.create(body)
        .then(user => {
          const token = jwt.sign({ data: user }, secrettoken.jwtTken, {
            expiresIn: '5h'
          });
          res.status(HttpStatus.CREATED).json({
            message: Msg.OK,
            user,
            token
          });
        })
        .catch(error => {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: Msg.INTERNALSERVERERROR + error.message });
        });
    });
  },

  async LoginUser(req, res) {
    if (!req.body.username || !req.body.password) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: Msg.NOEMPTY });
    }

    await User.findOne({ username: helper.firstUpper(req.body.username) })
      .then(user => {
        if (!user) {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ message: Msg.USERNOFOUND });
        }
        return bcrypt.compare(req.body.password, user.password).then(result => {
          if (!result) {
            return res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: Msg.PWDINCORRECT });
          }
          const token = jwt.sign({ data: user }, secrettoken.jwtTken, {
            expiresIn: '5h'
          });
          res.cookie('auth', token);
          return res
            .status(HttpStatus.OK)
            .json({ message: Msg.OK, user, token });
        });
      })
      .catch(err => {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: Msg.INTERNALSERVERERROR + err.message });
      });
  }
};
