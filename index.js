const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users.js');

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })
);

// database connection and server listening
mongoose
    .connect(
        'mongodb://127.0.0.1:27017/smart_kids?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2'
    )
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running | http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.log(err));

// routes
app.use('/users', usersRoutes);
