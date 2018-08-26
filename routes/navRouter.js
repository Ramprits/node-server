const express = require('express');
const router = express.Router();
const navController = require('../controllers/nav');

router.post('/', navController.addnavigation);
router.get('/', navController.getAllMenus);

module.exports = router;
