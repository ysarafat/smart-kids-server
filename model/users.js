const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: [true, 'User name  required'],
            unique: [true, 'User  name already exist'],
            minlength: [5, 'user Name length must be 5'],
        },
        role: {
            type: String,
            enum: ['student', 'admin', 'teacher'],
            default: 'student',
        },
        email: {
            type: String,
            unique: [true, 'Email already exist'],
            required: [true, 'Email  required'],
        },
        password: {
            type: String,
            required: [true, 'Password  required'],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
