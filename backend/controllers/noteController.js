const { postNoteValidate } = require('../validators/noteValidator')
const Note = require('../models/noteModel')

// FETCH NOTES
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find()
        if (!notes || notes.length === 0) {
            return res.status(400).json({
                error: true,
                success: false,
                message: 'No note available',
            })
        }

        res.status(200).json({
            error: false,
            success: true,
            notes,
            message: 'Notes successfully fetched',
        })
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        })
    }
}
// POST NOTE
const postNote = async (req, res) => {
    try {
        const { error } = postNoteValidate.validate(req.body)
        if (error)
            return res.status(400).json({
                error: true,
                success: false,
                message: error.details[0].message,
            })

        const userId = req.cookie('userId')

        if (!userId)
            return res.status(400).json({
                error: true,
                success: false,
                message: 'Invalid User ID',
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

const getNote = async (req, res) => {
    const { noteId } = req.params
    if (!noteId)
        return res.status(400).json({
            error: true,
            success: false,
            message: 'Note ID is invalid',
        })

    const note = await Note.findById(noteId).sort({ isPinned: -1 })
    if (!note)
        return res.status(400).json({
            error: true,
            success: false,
            message: 'Note not found',
        })

    res.status(200).json({
        error: false,
        success: true,
        message: 'Note fetched sucessfully',
    })
}

// EDIT NOTE
const editeNote = async (req, res) => {
    try {
        // GET NOTE ID
        const { noteId } = req.params
        if (!noteId)
            return res.status(400).json({
                error: true,
                success: false,
                message: 'Note ID is invalid/missing',
            })

        // CHECK FOR ERROR
        const { error } = postNoteValidate.validate(req.body)
        if (error)
            return res.status(400).json({
                error: true,
                success: false,
                message: error.details[0].message,
            })

        // CHECK USER ID
        const userId = req.cookies.noteId
        if (!userId)
            return res.status(400).json({
                error: true,
                success: false,
                message: 'User ID is missing',
            })

        const user = await Note.findOne({ _id: noteId, userId })

        if (!user)
            return res.status(400).json({
                error: true,
                success: false,
                message: 'User Info is wrong',
            })

        const updateNote = await Note.findByIdAndUpdate(
            { _id: user._id },
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    isPinned: req.body.isPinned,
                    tags: req.body.tags,
                },
            },
            { new: true }
        )

        if (!updateNote)
            return res.status(400).json({
                error: true,
                success: false,
                message: 'Note could not update',
            })

        res.status(200).json({
            error: false,
            success: true,
            updateNote,
            message: 'Note updated successfully',
        })
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        })
    }
}

// DELETE NOTE
const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params
        // CHECK IF NOTE ID DOES NOT EXIST
        if (!noteId)
            return res.status(400).json({
                error: true,
                success: false,
                message: 'Note ID is invalid/missing',
            })

        const note = await Note.findByIdAndDelete({ _id: noteId })
        if (!note)
            return res.status(400).json({
                error: true,
                success: false,
                message: 'Note could not deleted',
            })

        // CHECJ IF NOTES LENGTH IS ZERO
        if (note.length === 0)
            return res
                .status(400)
                .json({ error: 'No note available in the database' })

        res.status(200).json({
            error: false,
            success: true,
            message: 'Note deleted successfully',
        })
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        })
    }
}

module.exports = { postNote, getNotes, getNote, deleteNote, editeNote }
