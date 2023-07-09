const User = require("./../models/users");
const { errorHandler, resHandler } = require('../config/handler')

module.exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        const createUser = await user.save()
        res.send(resHandler(createUser))
    } catch (error) {
        res.send(errorHandler(error))

    }
}

module.exports.users = async (req, res) => {
    try {
        const { limit, skip, desc, key, search } = req.body
        const total = await User.find({"userType":"user"}).count()
        const users = await User.find({"userType":"user"}).limit(limit).skip(skip).sort({ [key]: desc ? -1 : 1 }).select({
            email: 1, firstName: 1, lastName: 1, phone: 1, status:1, userType:1
        })
        res.send(resHandler({users,total}))
    } catch (error) {
        res.send(errorHandler(error))

    }
}

module.exports.user = async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        res.send(resHandler(user))
    } catch (error) {
        res.send(errorHandler(error))

    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const _id = req.params.id
        const updateUser = await User.findByIdAndUpdate(_id, req.body, { new: true })
        res.send(resHandler(updateUser))
        console.log(first)
    } catch (error) {
        res.send(errorHandler(error))

    }
}
module.exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        if (!req.params.id) res.status(400).send()
        res.send(resHandler(deleteUser))
    } catch (error) {
        res.send(errorHandler(error))

    }
}
module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        const isMatch = await user.verifyPassword(req.body.password)
        if(user.status === false){
            res.send(errorHandler("User Inactive."))
        } else {
            if (isMatch) {
                const token = await user.generateJWT()
                const result = {
                    "_id": user._id,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email,
                    "phone": user.phone,
                    "token": token
                }
                await res.send(resHandler(result))
            } else {
                res.send(errorHandler("Invalid login details."))
            }
        }
    } catch (error) {
        res.send(errorHandler(error))

    }
}

module.exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((ele) => ele.token !== req.token)
        await req.user.save()
        await res.send(resHandler())
    } catch (error) {
        res.send(errorHandler(error))

    }
}