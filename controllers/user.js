const HttpStatus = require('http-status-codes');
const User = require('../models/userModel');

module.exports = {
  getUsers(res) {
    User.find({})
      .populate('posts.postId')
      .then(response => {
        res.status(HttpStatus.OK).json({
          message: 'user fetched sucessfully!',
          response
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
};
