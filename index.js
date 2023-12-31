const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js');
const usersRoutes = require('./routes/users.js');
const CourseRoutes = require('./routes/course.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })
);

// database connection and server listening
mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running | http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.log(err));

// routes
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/course', CourseRoutes);

// default error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});
