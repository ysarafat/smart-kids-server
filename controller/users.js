const createError = require('../error.js');
const User = require('../model/users.js');
// get a single user
const findUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (user?._id) {
            const { password, ...others } = user._doc;
            return res.status(200).json({
                success: true,
                data: others,
            });
        }
    } catch {
        next(createError(404, 'User Not Found'));
    }
};

module.exports = { findUser };
