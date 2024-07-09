const cors = require('cors')
const helmet = require('helmet')
const express = require('express')

const userRoutes = require('../routes/userRoutes')
const noteRoutes = require('../routes/noteRoutes')

module.exports = function (app) {
    const corsOptions = {
        origin: [
            'http://localhost:5173',
            'https://notes-app-u25h.onrender.com',
        ],
        credentials: true,
        methods: ['GET, POST', 'PUT', 'DELETE', 'PATCH'],
        allowHeaders: [
            'Content-Type',
            'Authorization',
            'Access-Control-Allow-Credentials',
        ],
    }
    app.use(helmet())
    app.use(express.json({ limit: '10MB' }))
    app.use(cors(corsOptions))
    app.use('/api/user', userRoutes)
    app.use('/api/note', noteRoutes)
}
