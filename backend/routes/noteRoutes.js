const express = require('express')
const {
    postNote,

    deleteNote,
    getNotes,
    getNote,
    editeNote,
} = require('../controllers/noteController')

const router = express()

// ROUTES FEN
router.get('/', getNotes)
router.get('/:noteId', getNote)
router.post('/add-note', postNote)
router.put('/update-note/:noteId', editeNote)
router.delete('/delete-note/:noteId', deleteNote)

module.exports = router
