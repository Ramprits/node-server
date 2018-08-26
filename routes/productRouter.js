const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product');

router.get('', productCtrl.getAllProducts);
router.post('', productCtrl.addproduct);

module.exports = router;
