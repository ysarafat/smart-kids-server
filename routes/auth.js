const express = require('express');
const { signupUser, signInUser } = require('../controller/auth.js');
const verifyToken = require('../middleware/verifyToken.js');

const route = express.Router();
// register user
route.post('/signup', signupUser);
// login user
route.post('/signin', signInUser);
module.exports = route;
