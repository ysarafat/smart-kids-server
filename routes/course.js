const express = require('express');
const verifyToken = require('../middleware/verifyToken');

const {
    createCourse,
    updateCourse,
    enrolledCourse,
    getAllCourse,
    getVideo,
    deleteSingleVideo,
} = require('../controller/course');

const router = express.Router();
// create course
router.post('/create', verifyToken, createCourse);
// update course
router.patch('/update/:id', verifyToken, updateCourse);
// enroller course
router.patch('/enroll/:id', verifyToken, enrolledCourse);
// get all course
router.get('/all', getAllCourse);
// get a course
router.get('/:id', getVideo);
// delete a course
router.delete('/delete/:id', deleteSingleVideo);
module.exports = router;
