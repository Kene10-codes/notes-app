const { postNoteValidate } = require('../validators/noteValidator')
const Note = require('../models/noteModel')

const postNote = async (req, res) => {
    try {
        const { error } = postNoteValidate.validate(req.body)
        if (error)
            return res.status(400).json({
                error: true,
                success: false,
                message: error.details[0].message,
            })

        if (!userId)
            return res.status(400).json({
                error: true,
                success: false,
                message: 'User ID missing',
            })

        // SAVE NOTE
        const note = new Note({
            userId,
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags || [],
        })

        await note.save()
        res.status(200).json({
            error: false,
            success: true,
            message: 'Note save successfully',
        })
    } catch (e) {
        return res.status(500).json({
            error: true,
            success: false,
            message: 'Internal server error',
        })
    }
}

module.exports = { postNote }
