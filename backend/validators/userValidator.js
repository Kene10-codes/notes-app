const Joi = require('joi')

// REGISTER USRE VALIDATOR
const userValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().max(255).email().required(),
    password: Joi.string().min(6).required(),
})

const loginValidator = Joi.object({
    email: Joi.string().max(255).email().required(),
    password: Joi.string().min(6).required(),
})

module.exports = { userValidator, loginValidator }
