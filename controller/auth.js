const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/users');
const createError = require('../error');

const signupUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hashPassword });
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'SignUp successful',
        });
    } catch (error) {
        res.status(409).json({
            success: false,
            message: error.message,
        });
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
                    data: other,
                });
        }
    } catch {
        next(createError(500, 'There was an error'));
    }
};
module.exports = { signupUser, signInUser };
