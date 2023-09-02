const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        instructor: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        banner: {
            type: String,
            required: true,
        },
        video: {
            type: String,
            required: true,
        },
        enrolledKids: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
