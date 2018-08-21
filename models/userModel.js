const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// @ts-ignore
const authUserSchema = mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String
});

authUserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', authUserSchema);
