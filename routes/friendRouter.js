const express = require('express');
const router = express.Router();
const friendCtrl = require('../controllers/friends');
const AuthHelper = require('../helper/AuthHelper');

router.post('', AuthHelper.VerifyToken, friendCtrl.FollowUser);
router.post('/unfollowUser', AuthHelper.VerifyToken, friendCtrl.UnFollowUser);
router.post('/mark/:id', AuthHelper.VerifyToken, friendCtrl.MarkNotification);

module.exports = router;
