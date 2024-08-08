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
        const { email } = user
        res.header('x-auth-token', token)
        res.cookie('userId', user._id)
        res.status(201).json({
            error: false,
            success: true,
            token,
            email,
            message: 'User successfully registered',
        })
    } catch (e) {
        return res.status(500).json({
            error: true,
            success: false,
            message: e.message,
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

        res.header('x-auth-token', token)
        res.cookie('userId', user._id)
        res.status(200).json({
            error: false,
            success: true,
            message: 'User logged In',
        })
    } catch (e) {
        return res.status(500).json({
            error: true,
            success: false,
            message: e.message,
        })
    }
}

// GET USER
const getUser = async (req, res) => {
    try {
        const user = req.user
        console.log(user)
        let userInfo = await User.findOne({ _id: user._id })
        if (!userInfo)
            return res.status(400).json({
                error: true,
                success: false,
                message: 'User not found',
            })

        const { email, name } = userInfo
        res.status(200).json({
            error: false,
            success: true,
            user: {
                email,
                name,
            },
            message: 'User found',
        })
    } catch (e) {
        return res.status(500).json({
            error: true,
            success: false,
            message: e.message,
        })
    }
}

// EXPORT CONTROLLERS
module.exports = { registerUser, loginUser, getUser }
