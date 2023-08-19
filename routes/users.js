const express = require('express');
const { signupUser } = require('../controller/auth.js');

const route = express.Router();
// register user
route.post('/signup', signupUser);

module.exports = route;
