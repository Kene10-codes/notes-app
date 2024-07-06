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
            return res
                .status(400)
                .json({ success: false, message: 'User already exists' })

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        // GENERATE SALT & HASH
        const salt = await bcryptjs.genSalt(10)
        req.body.password = await bcryptjs.hash(req.body.password, salt)

        // SAVE NEW USER
        await user.save()
        res.status(200).json({
            success: true,
            message: 'User successfully registered',
        })
    } catch (e) {
        console.log(e)
    }
}

// LOGIN USER
const loginUser = async (req, res) => {
    const { error } = loginValidator.validate(req.body)
    if (error)
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message })

    const userInfo = await User.findOne({ email: req.body.email })
    if (!userInfo)
        return res
            .status(401)
            .json({ success: false, message: 'Incorrect email/password' })

    // COMPARE PASSWORD
    const matchPassword = await bcryptjs.compare(
        req.body.password,
        userInfo.password
    )
    if (!matchPassword)
        return res
            .status(401)
            .json({ success: false, message: 'Incorrect email/password' })

    // GENERATE TOKEN
    const token = await User.generateToken()
    res.header('note-token', token)
    res.status(200).json({ success: true, message: 'User logged In' })
}

// EXPORT CONTROLLERS
module.exports = { registerUser, loginUser }
