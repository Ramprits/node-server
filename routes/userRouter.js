const express = require('express');
const router = express.Router();
const Usercontroller = require('../controllers/user');
const AuthHelper = require('../helper/AuthHelper');

router.get('',Usercontroller.getUsers);

module.exports = router;
