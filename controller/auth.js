const bcrypt = require('bcrypt');
const User = require('../model/users');

const signupUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hashPassword });
        await newUser.save();
        return res.status(200).json({
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

module.exports = { signupUser };
