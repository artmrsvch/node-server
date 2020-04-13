const { check } = require('express-validator')
const { secret } = require('../config/index').jwt
const jwt = require('jsonwebtoken')

module.exports = {
    registration: [
        check('username', 'Минимальная длина никнейма 3 символа').isLength({ min: 3 }),
        check('firstName', 'Имя должно быть указано').notEmpty(),
        check('surName', 'Фамилия должна быть указана').notEmpty(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    login: [
        check('username', 'Минимальная длина никнейма 3 символа').isLength({ min: 3 }),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    getTokens: (req, res, next) => {
        const token = req.headers.authorization
        let payload;
        try {
            payload = jwt.verify(token, secret)
            if (payload.type !== 'refresh') {
                res.status(400).json({ message: 'Invalid token!' })
            }
            if (refreshToken === null) {
                res.status(400).json({ message: 'Invalid token!' })
            }
            req.payload = { ...payload, token }

        } catch (e) {
            if (e instanceof jwt.TokenExpiredError) {
                res.status(400).json({ message: 'Token expired!' })
                return
            } else if (e instanceof jwt.JsonWebTokenError) {
                res.status(400).json({ message: 'Invalid token!' })
                return
            } else {
                res.status(500).json({ message: 'Что-то пошло не так' })
            }

        }

        next()
    }
}