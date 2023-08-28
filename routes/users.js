const express = require('express');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// get a user
router.get('/find/:id', verifyToken);
module.export = router;
