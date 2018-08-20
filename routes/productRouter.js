const express = require('express');
const router = express.Router();
const Product = require('../models/productmodel');
const jsonwebtoken = require('jsonwebtoken');
const productCtrl = require('../controllers/product');
const verifyToken = require('../helper/AuthHelper');

router.get('', productCtrl.getAllProducts);
router.post('', productCtrl.addproduct);

module.exports = router;
