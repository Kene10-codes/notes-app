const express = require('express')
const {
    postNote,

    deleteNote,
    getNotes,
    getNote,
    editeNote,
} = require('../controllers/noteController')
const { authenticateToken } = require('../utils/token')

const router = express()

// ROUTES FEN
router.get('/', getNotes)
router.get('/:noteId', getNote)
router.post('/add-note', authenticateToken, postNote)
router.put('/update-note/:noteId', authenticateToken, editeNote)
router.delete('/delete-note/:noteId', authenticateToken, deleteNote)

module.exports = router
