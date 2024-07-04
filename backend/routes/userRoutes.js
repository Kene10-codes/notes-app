const express = require('express')
const { registerUser } = require('../controllers/userController')
const router = express()

// ROUTES FEN
router.post('/register', registerUser)

module.exports = router
