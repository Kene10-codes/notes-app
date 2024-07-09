const express = require('express')
const { postNote } = require('../controllers/noteController')

const router = express()

// ROUTES FEN
router.post('/add-note', postNote)

module.exports = router
