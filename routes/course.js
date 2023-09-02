const express = require('express');
const verifyToken = require('../middleware/verifyToken');

const { createCourse, updateCourse, enrolledCourse } = require('../controller/course');

const router = express.Router();
// create course
router.post('/create', verifyToken, createCourse);
// update course
router.patch('/update/:id', verifyToken, updateCourse);
// enroller course
router.patch('/enroll/:id', verifyToken, enrolledCourse);
module.exports = router;
