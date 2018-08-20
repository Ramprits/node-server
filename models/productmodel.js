const mongoose = require('mongoose');

// @ts-ignore
const productSchema = mongoose.Schema({
  name: { type: String, default: '', require: true },
  description: { type: String, default: '', require: true },
  price: { type: Number, default: '', require: true },
  image: { type: String, default: '' },
  created: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Product', productSchema);
