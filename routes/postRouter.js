const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
const jsonwebtoken = require('jsonwebtoken');
const postcontroller = require('../controllers/post');
const verifyToken = require('../helper/AuthHelper');

router.post('/add-post', postcontroller.addPost);

module.exports = router;
