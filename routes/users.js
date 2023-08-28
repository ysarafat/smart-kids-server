const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { findUser } = require('../controller/users');

const router = express.Router();

// get a user
router.get('/find/:id', verifyToken, findUser);
module.exports = router;
