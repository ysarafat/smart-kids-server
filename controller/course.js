const createError = require('../error');
const Course = require('../model/courses');
const User = require('../model/users');
// create course
const createCourse = async (req, res, next) => {
    const courseData = req.body;

    try {
        const newCourse = new Course({ userId: req.user.id, ...courseData });
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
        const courseId = req.params.id;
        const updatedCourseData = req.body;
        const userId = req.user.id;

        const findCourse = await Course.findById(courseId);

        if (!findCourse) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Check if the user trying to update the course is the course creator
        if (findCourse?.userId !== userId) {
            return res.status(403).json({ success: false, message: 'Permission denied' });
        }

        // Update the course
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $set: updatedCourseData },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            course: updatedCourse,
        });
    } catch (error) {
        next(createError(500, 'There was an error'));
    }
};

// enrolled course
const enrolledCourse = async (req, res, next) => {
    try {
        const findCourse = await Course.findById(req.params.id);
        const findEnroll = findCourse?.enrolledKids.find((user) => user === req.user.id);
        if (!findEnroll) {
            await Course.findByIdAndUpdate(req.params.id, {
                $push: { enrolledKids: req.user.id },
            });
            await User.findByIdAndUpdate(req.user.id, {
                $push: { enrolled: req.params.id },
            });
            return res.status(200).json({
                success: true,
                message: 'Course Enroll successfully',
            });
        }
        res.status(200).json({
            success: false,
            message: 'You are already enrolled',
        });
    } catch (err) {
        next(createError(500, 'There was an error'));
    }
};
// get all course
const getAllCourse = async (req, res, next) => {
    try {
        const result = await Course.find().sort({ createdAt: -1 }).select({ __v: 0 });
        res.status(200).json({
            success: true,
            message: 'successful',
            data: result,
        });
    } catch (error) {
        next(createError(500, 'There was an error'));
    }
};

// get a course
const getVideo = async (req, res, next) => {
    try {
        const result = await Course.findById(req.params.id);
        if (result?._id) {
            res.status(200).json({
                success: true,
                message: 'successful',
                data: result,
            });
        }
    } catch (error) {
        next(createError(404, 'Course not found'));
    }
};
// delete a video
const deleteSingleVideo = async (req, res, next) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Course delete successfully',
        });
    } catch (error) {
        next(createError(500, 'There was an error'));
    }
};
module.exports = {
    createCourse,
    updateCourse,
    enrolledCourse,
    getAllCourse,
    getVideo,
    deleteSingleVideo,
};
