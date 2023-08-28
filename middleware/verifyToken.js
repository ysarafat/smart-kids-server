const jwt = require('jsonwebtoken');
const createError = require('../error');

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return next(createError(401, 'Unauthorized access'));
    }
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(createError(403, 'Invalid or expire token'));
        }
        req.user = user;
        next();
    });
};

module.exports = verifyToken;
