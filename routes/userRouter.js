const express = require('express');
const router = express.Router();
const Usercontroller = require('../controllers/user');
const AuthHelper = require('../helper/AuthHelper');

router.get('', AuthHelper.VerifyToken, Usercontroller.getUsers);
router.get('/:id', AuthHelper.VerifyToken, Usercontroller.getUser);
router.get(
  ':getUserByName',
  AuthHelper.VerifyToken,
  Usercontroller.getUserByName
);

module.exports = router;
