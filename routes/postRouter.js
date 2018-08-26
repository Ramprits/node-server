const express = require('express');
const router = express.Router();
const postcontroller = require('../controllers/post');
const AuthHelper = require('../helper/AuthHelper');

router.get('', AuthHelper.VerifyToken, postcontroller.getAllPosts);
router.get('/:id', AuthHelper.VerifyToken, postcontroller.getPost);
router.post('', AuthHelper.VerifyToken, postcontroller.addPost);
router.post('/addLikes', AuthHelper.VerifyToken, postcontroller.addLikes);
router.post('/addComment', AuthHelper.VerifyToken, postcontroller.addComment);

module.exports = router;
