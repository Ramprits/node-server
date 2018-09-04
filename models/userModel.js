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
  ],
  notifications: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: { type: String },
      viewProfile: { type: Boolean, default: false },
      created: { type: Date, default: Date.now() },
      read: { type: Date, default: Date.now() },
      date: { type: String, default: '' }
    }
  ],
  roles: { type: String, default: 'V' }
});

module.exports = mongoose.model('User', authUserSchema);
