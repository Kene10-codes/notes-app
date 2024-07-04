const { userValidator } = require('../validators/userValidator')
const User = require('../models/userSchema')

// REGSITER USER
const registerUser = async (req, res) => {
    try {
        // CHECK ERROR
        const { error } = userValidator.validate(req.body)
        if (error)
            return res
                .status(400)
                .json({ success: false, message: error.details[0].details })

        // CHECK EMAIL
        const emailExists = await User.findOne({ email: req.body.email })
        if (emailExists)
            return res
                .status(400)
                .json({ success: false, message: 'User already exists' })

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

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

module.exports = { registerUser }
