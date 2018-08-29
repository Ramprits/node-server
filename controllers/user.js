const HttpStatus = require('http-status-codes');
const User = require('../models/userModel');
const msg = require('../middleware/message');
module.exports = {
  getUsers(req, res) {
    User.find({})
      .populate('posts.postId')
      .populate('following.userFollowed')
      .populate('followers.follower')
      .then(users => {
        res.status(HttpStatus.OK).json({
          message: msg.OK,
          users
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  },
  async getUser(req, res) {
    await User.findOne({ _id: req.params.id })
      .populate('posts.postId')
      .populate('following.userFollowed')
      .populate('followers.follower')
      .then(users => {
        res.status(HttpStatus.OK).json({
          message: msg.OK,
          users
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  },
  async getUserByName(req, res) {
    await User.findOne({ _id: req.params.username })
      .populate('posts.postId')
      .populate('following.userFollowed')
      .populate('followers.follower')
      .then(users => {
        res.status(HttpStatus.OK).json({
          message: msg.OK,
          users
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
};
