const jwt = require('jsonwebtoken')

const authenticateToken = async (req, res, next) => {
    const token = req.header('x-auth-token')

    if (!token) return res.status(400).json({ error: 'No token provided!' })

    try {
        // VERIFY TOKEN PROVIDED
        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        req.user = decodedToken
        next()
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = { authenticateToken }
