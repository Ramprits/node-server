const HttpStatus = require('http-status-codes');
const User = require('../models/userModel');
const Msg = require('../middleware/message');
module.exports = {
  getFriends(req, res) {
    const followUser = async () => {
      await User.update(
        {
          _id: req.user._id,
          'following.userFollowed': { $ne: req.body.userFollowed }
        },
        { $push: {} }
      );
    };
  }
};
