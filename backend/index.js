require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')
const PORT = process.env.PORT || 3200

const DB_CONNECT = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@nodetut.n6pqp.mongodb.net/Notes?retryWrites=true&w=majority`

// CONNECT APP
const startServer = () => {
    try {
        mongoose
            .connect(DB_CONNECT)
            .then(() => {
                app.listen(PORT, () =>
                    console.log(`DB is connected on port ${PORT}`)
                )
            })
            .then((error) => console.log(error))
    } catch (e) {
        console.log(e)
    }
}

// START SERVER
startServer()
