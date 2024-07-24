const Joi = require('joi')

const postNoteValidate = new Joi.object({
    tags: Joi.required(),
    title: Joi.string().min(4).required(),
    content: Joi.string().required(),
    isPinned: Joi.boolean().required(),
})

module.exports = { postNoteValidate }
