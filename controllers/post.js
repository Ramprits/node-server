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
  },
  async getAllPosts(req, res) {
    try {
      const posts = await Post.find({})
        .populate('user')
        .sort({ created: -1 });
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Post retrived sucessfully', posts })
        .catch(error => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};
