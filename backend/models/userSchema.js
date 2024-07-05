const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
        },
        password: {
            type: String,
            minlength: 6,
            required: true,
        },
    },
    { timestamp: true }
)

// VERIFY TOKEN FUNC

userSchema.method.generateToken = () => {
    return jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: '1d',
    })
}

// INSTANTIATE MODEL
const User = mongoose.model('User', userSchema)

// EXPORT USER
module.exports = User
