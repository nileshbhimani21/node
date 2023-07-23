const mongoose = require('mongoose');
const validator = require("validator")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../utils/handler');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error("Invalid Eamil")
            }
        }
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        min: 10

    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new error("Password must be strong")
            }
        }
    },
    userType: {
        type: String,
        trim: true,
    },
    userId: {
        type: String,
        trim: true,
    },
    status: {
        type: Boolean,
    },
    roles: [String],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

//bcrypt password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

//varify password
userSchema.methods.verifyPassword = async function (password) {
    const varify = await bcrypt.compare(password, this.password)
    return varify;
};

// JWT Generate
userSchema.methods.generateJWT = async function (next) {
    try {
        const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })
        this.tokens = this.tokens.concat({ token })
        await this.save()
        return token
    } catch (error) {
        res.send(errorHandler(error))
    }
}

const User = new mongoose.model('User', userSchema)

module.exports = User