const express = require('express');
const router = express.Router();
const friendCtrl = require('../controllers/friends');
const AuthHelper = require('../helper/AuthHelper');

router.post('', AuthHelper.VerifyToken, friendCtrl.getFriends);

module.exports = router;
