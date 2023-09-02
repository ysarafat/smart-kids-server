const createError = require('../error');
const Course = require('../model/courses');
// create course
const createCourse = async (req, res, next) => {
    const courseData = req.body;
    try {
        const newCourse = new Course(courseData);
        const result = await newCourse.save();
        res.status(201).json({
            success: true,
            message: 'Course Create successfully.',
            data: result,
        });
    } catch (error) {
        next(createError(500, 'There was an error'));
    }
};

// update course
const updateCourse = async (req, res, next) => {
    try {
        const findCourse = await Course.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (findCourse) {
            res.status(200).json({
                success: true,
                message: 'Course updated successfully',
                course: findCourse,
            });
        } else {
            res.status(404).json({ success: false, message: 'Course not found' });
        }
    } catch {
        next(createError(500, 'There was an error'));
    }
};
module.exports = { createCourse, updateCourse };
