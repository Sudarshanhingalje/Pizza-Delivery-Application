const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { forgotPassword, resetPassword } = require('../controllers/forgetPassController');

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
module.exports = router;

