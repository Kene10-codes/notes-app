const Joi = require('joi')

const postNoteValidate = new Joi.object({
    userId: Joi.string().min(4).required(),
    title: Joi.string().min(4).required(),
    content: Joi.string().required(),
    isPinned: Joi.boolean().required(),
})

module.exports = { postNoteValidate }
