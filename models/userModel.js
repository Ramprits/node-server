const mongoose = require('mongoose');

// @ts-ignore
const authUserSchema = mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  posts: [
    {
      postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
      post: { type: String },
      createdAt: { type: Date, default: Date.now() }
    }
  ],
  following: [
    { userFollowed: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }
  ],
  followers: [
    { follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }
  ]
});

module.exports = mongoose.model('User', authUserSchema);
