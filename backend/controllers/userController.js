const bcryptjs = require('bcryptjs')
const { userValidator, loginValidator } = require('../validators/userValidator')
const User = require('../models/userModel')

// REGISTER USER
const registerUser = async (req, res) => {
    try {
        // CHECK ERROR
        const { error } = userValidator.validate(req.body)
        if (error)
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message })

        // CHECK EMAIL
        const emailExists = await User.findOne({ email: req.body.email })
        if (emailExists)
            return res.status(400).json({
                error: true,
                success: false,
                message: 'User already exists',
            })

        // GENERATE SALT & HASH PASSWWORD
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(req.body.password, salt)

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })

        // SAVE NEW USER
        await user.save()
        const token = user.generateToken()

        res.header('note-token', token)
        res.cookie('user-id', user._id)
        res.status(201).json({
            error: false,
            success: true,
            message: 'User successfully registered',
        })
    } catch (e) {
        return res.status(500).json({
            error: true,
            success: false,
            message: 'Internal server error',
        })
    }
}

// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { error } = loginValidator.validate(req.body)
        if (error)
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message })

        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return res
                .status(401)
                .json({ success: false, message: 'Incorrect credentials' })

        // COMPARE PASSWORD
        const matchPassword = await bcryptjs.compare(
            req.body.password,
            user.password
        )

        if (!matchPassword)
            return res.status(401).json({
                error: true,
                success: false,
                message: 'Incorrect email/password',
            })

        // GENERATE TOKEN
        const token = user.generateToken()

        res.header('note-token', token)
        res.cookie('user-id', user._id)
        res.status(200).json({
            error: false,
            success: true,
            message: 'User logged In',
        })
    } catch (e) {
        return res.status(500).json({
            error: true,
            success: false,
            message: 'Internal server error',
        })
    }
}

// GET USER
const getUser = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.parms.id })
        if (!user)
            return res.status(400).json({
                error: true,
                success: false,
                message: 'User not found',
            })

        res.status(200).json({
            error: false,
            success: true,
            users: {
                name: user.name,
                email: user.email,
            },
            message: 'User found',
        })
    } catch (e) {
        return res.status(500).json({
            error: true,
            success: false,
            message: 'Internal server error',
        })
    }
}

// EXPORT CONTROLLERS
module.exports = { registerUser, loginUser, getUser }
