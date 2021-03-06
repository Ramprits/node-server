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
      const posts = await Post.find({}).populate('user');
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Post retrived sucessfully', posts })
        .catch(error => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  },

  async getPost(req, res) {
    await Post.findOne({ _id: req.params.id })
      .populate('user')
      .populate('comments.userid')
      .then(post => {
        res.status(HttpStatus.OK).json({
          message: 'Post found',
          post
        });
      })
      .catch(error => {
        res.status(HttpStatus.NOT_FOUND).json({
          message: 'error occured!'
        });
      });
  },
  async addLikes(req, res) {
    const postId = req.body._id;

    await Post.update(
      {
        _id: postId,
        'likes.username': { $ne: req.user.username }
      },
      {
        $push: { likes: { username: req.user.username } },
        $inc: { totalLikes: 1 }
      }
    )
      .then(() => {
        res.status(HttpStatus.OK).json({
          message: 'Like added'
        });
      })
      .catch(error => {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'unable add like' });
      });
  },
  async addComment(req, res) {
    const postId = req.body.postId;

    await Post.update(
      {
        _id: postId
      },
      {
        $push: {
          comments: {
            userId: req.user._id,
            username: req.user.username,
            comment: req.body.comment,
            createdAt: new Date()
          }
        }
      }
    )
      .then(() => {
        res.status(HttpStatus.OK).json({
          message: 'comment added'
        });
      })
      .catch(error => {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'unable add comment' });
      });
  }
};
