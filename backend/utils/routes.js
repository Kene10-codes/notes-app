const cors = require('cors')
const helmet = require('helmet')
const userRoutes = require('../routes/userRoutes')

module.exports = function (app) {
    app.use(helmet())
    app.use(cors({ origin: '*' }))
    app.use('/api/user', userRoutes)
}
