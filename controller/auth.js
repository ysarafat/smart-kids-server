const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/users');
const createError = require('../error');

const signupUser = async (req, res, next) => {
    try {
        const { name, userName, email, password } = req.body;

        // check existing user
        const existingUserNameUser = await User.findOne({ userName });
        if (existingUserNameUser) {
            return res.status(409).json({ error: 'UserName already exists.' });
        }
        const existingEmailUser = await User.findOne({ email });
        if (existingEmailUser) {
            return res.status(409).json({ error: 'Email already exists.' });
        }

        // Create a new user
        const newUser = new User({ name, userName, email, password });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully.' });
    } catch {
        next(createError(500, 'There was an error'));
    }
};

const signInUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            $or: [{ userName: req.body.identifier }, { email: req.body.identifier }],
        });
        if (!user) {
            next(createError(404, 'User not found'));
        }
        const checkPassword = await bcrypt.compare(req.body.password, user?.password);
        if (!checkPassword) {
            return next(createError(401, 'Authentication failed! Wrong credentials'));
        }
        const token = jwt.sign(
            { id: user._id, user: req.body.identifier },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            }
        );
        if (token) {
            const { password, ...other } = user._doc;
            res.cookie('access_token', token, {
                httpOnly: true,
            })
                .status(200)
                .json({
                    success: true,
                    message: 'Authentication Successful',
                    access_token: token,
                    data: other,
                });
        }
    } catch (err) {
        console.log(err);
        next(createError(500, 'There was an error'));
    }
};
module.exports = { signupUser, signInUser };
