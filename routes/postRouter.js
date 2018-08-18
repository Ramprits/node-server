const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
const jsonwebtoken = require('jsonwebtoken');
const authCtrl = require('../controllers/post');

router.post('/post', authCtrl.addPost);

module.exports = router;
