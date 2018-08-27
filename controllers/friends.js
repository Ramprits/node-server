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
        {
          $push: {
            following: {
              userFollowed: req.body.userFollowed
            }
          }
        }
      );
      await User.update(
        {
          _id: req.body.userFollowed,
          'following.follower': { $ne: req.user._id }
        },
        {
          $push: {
            followers: {
              userFollowed: req.body._id
            }
          }
        }
      );
    };
    followUser()
      .then(() => {
        res.status(HttpStatus.OK).json({ message: Msg.OK });
      })
      .catch(() => {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: Msg.INTERNALSERVERERROR });
      });
  }
};
