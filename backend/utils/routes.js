const cors = require('cors')
const userRoutes = require('../routes/userRoutes')

module.exports = function (app) {
    app.use(cors({ origin: '*' }))
    app.use('/api/user', userRoutes)
}
