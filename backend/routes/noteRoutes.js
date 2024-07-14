const express = require('express')
const {
    postNote,
    editNote,
    deleteNote,
    getNotes,
    getNote,
} = require('../controllers/noteController')

const router = express()

// ROUTES FEN
router.get('/', getNotes)
router.get('/:noteId', getNote)
router.post('/add-note', postNote)
router.put('/update-note/:noteId', editNote)
router.delete('/delete-note/:noteId', deleteNote)

module.exports = router
