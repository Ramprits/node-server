const HttpStatus = require('http-status-codes');
const Product = require('../models/productmodel');
const msg = require('../middleware/message');
module.exports = {
  async addproduct(req, res) {
    const body = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image
    };
    await Product.create(body)
      .then(() => {
        res.status(HttpStatus.CREATED).json({ message: msg.CREATED });
      })
      .catch(error => {
        console.log(error);
      });
  },

  async getAllProducts(req, res) {
    await Product.find({})
      .then(response => {
        res.status(HttpStatus.OK).json({
          message: msg.OK,
          products: response
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }
};
