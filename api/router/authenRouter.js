const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const router = express.Router();
const { register, login, forgotPassword, resetPassword, name } = require("../controller/authenCtl")

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/authentication-email').put(forgotPassword)
router.route('/resetpassword/:resetpasswordtoken').put(resetPassword)
router.route('/name/:id').post(name)




module.exports = router;