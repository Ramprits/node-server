const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
const jsonwebtoken = require('jsonwebtoken');
const postcontroller = require('../controllers/post');
const AuthHelper = require('../helper/AuthHelper');

router.post('', AuthHelper.VerifyToken, postcontroller.addPost);

module.exports = router;
