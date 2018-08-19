const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
const jsonwebtoken = require('jsonwebtoken');
const navController = require('../controllers/nav');
const verifyToken = require('../helper/AuthHelper');

router.post('/', navController.addnavigation);
router.get('/', navController.getAllMenus);

module.exports = router;
