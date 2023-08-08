// for user routes
const express = require('express');

// controller functions
const { signupUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// login route
// send post request body with email and password to DB
router.post('/login', loginUser);

// singup route
router.post('/signup', signupUser);

module.exports = router;
