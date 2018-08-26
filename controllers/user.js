const HttpStatus = require('http-status-codes');
const User = require('../models/userModel');

module.exports = {
  getUsers(req, res) {
    User.find({})
      .populate('posts.postId')
      .then(users => {
        res.status(HttpStatus.OK).json({
          message: 'user fetched sucessfully!',
          users
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
};
