require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')
const PORT = process.env.PORT || 3200

const DB_CONNECT = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@nodetut.n6pqp.mongodb.net/Notes?retryWrites=true&w=majority`

// CONNECT APP
const startServer = async () => {
    try {
        const DB_CONNECTED = await mongoose.connect(DB_CONNECT)
        if (!DB_CONNECTED) {
            throw new Error('DB connection with the URL was not successful')
        }
        app.listen(PORT, () => {
            console.log(`DB is connected on port ${PORT}`)
        })
    } catch (e) {
        throw new Error('DB connection was not successful')
    }
}

// START SERVER
startServer()
