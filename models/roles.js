const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        trim: true,
    },
    label: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true
})

const Role = new mongoose.model('Role', roleSchema)

module.exports = Role