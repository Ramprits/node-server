const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const authCtrl = require('../controllers/auth');

router.post('/register', authCtrl.createUser);

module.exports = router;
