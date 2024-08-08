const express = require('express')
const {
    registerUser,
    loginUser,
    getUser,
} = require('../controllers/userController')
const { authenticateToken } = require('../utils/token')
const router = express()

// ROUTES FEN
router.post('/register', registerUser)
router.get('/get-user', authenticateToken, getUser)
router.post('/login', loginUser)

module.exports = router
