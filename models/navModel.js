const mongoose = require('mongoose');

// @ts-ignore
const menuSchema = mongoose.Schema({
  label: String,
  url: String,
  routerLink: String,
  icon: String,
  createdAT: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('menu', menuSchema);
