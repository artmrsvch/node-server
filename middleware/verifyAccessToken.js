const { secret } = require('../config/index').jwt
const jwt = require('jsonwebtoken')

module.exports = {
    verify: (req, res, next) => {
        try {
            const token = req.headers.authorization
            const payload = jwt.verify(token, secret)
            if (payload.type !== 'access') {
                res.status(400).json({ message: 'Invalid token!' })
            }
            req.userId = payload.userId
        } catch (e) {
            if (e instanceof jwt.TokenExpiredError) {
                res.status(400).json({ message: 'Token expired!' })
                return
            } else if (e instanceof jwt.JsonWebTokenError) {
                res.status(400).json({ message: 'Invalid token!' })
                return
            } else {
                res.status(500).json({ message: 'Что-то пошло не так при верификации токена' })
            }
        }
        next()
    }
}