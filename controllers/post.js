const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const Post = require('../models/postModel');
const User = require('../models/userModel');

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
      .then(async post => {
        await User.update(
          {
            _id: req.user._id
          },
          {
            $push: {
              posts: {
                postId: post._id,
                post: req.body.post,
                createdAt: new Date()
              }
            }
          }
        );
        res.status(HttpStatus.CREATED).json({ message: 'Create sucessfully' });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
