require('dotenv').config()
const mongoose = require('mongoose')
const server = require('./app')

const DB_CONNECT = ``

// CONNECT APP
const startServer = () => {
    try {
        mongoose.connect()
    } catch (e) {
        console.log(e.message)
    }
}
