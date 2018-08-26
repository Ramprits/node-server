const HttpStatus = require('http-status-codes');
const Product = require('../models/postModel');

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
          res.status( HttpStatus.CREATED ).json( { message: 'Create sucessfully' } );
        })
      .catch(error => {
        console.log(error);
      });
  },

  async getAllProducts(res) {
    await Product.find()
      .then(response => {
        res.status(HttpStatus.OK).json({
          message: 'sucessfully',
          response
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }
};
