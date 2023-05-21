const jwt = require('jsonwebtoken');
const User = require("./../models/users");
const { errorHandler } = require('../config/handler');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const verifyUser = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id:verifyUser._id })
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.send(errorHandler(error))
    }
}
module.exports = auth