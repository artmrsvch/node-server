const User = require('../models/User')

const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const authHelper = require('../helpers/authHelper')
const toBase64 = require('../helpers/encodeBase64')

const updateTokens = async (userId) => {
    const tokens = authHelper.generateTokens(userId)
    await authHelper.replaceDbRefreshToken(tokens.refreshToken, userId)
    return tokens
}

module.exports = {
    register: async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при регистрации'
                })
            }

            const { password, username, surName, firstName, middleName } = req.body
            const candidate = await User.findOne({ username })

            if (candidate) {
                res.status(400).json({ message: 'Такой пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const userData = { username, password: hashedPassword, surName, firstName, middleName }
            const permission = {
                chat: { C: true, D: true, R: true, U: true },
                news: { C: true, D: true, R: true, U: true },
                settings: { C: true, D: true, R: true, U: true }
            };

            const user = new User({ ...userData, permission })

            await user.save()

            res.status(201).json({ ...userData, permission })

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    },
    login: async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при входе в систему'
                })
            }

            const { username, password } = req.body

            const user = await User.findOne({ username })

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
            }

            const tokens = await updateTokens(user._id)
            const image = user.image ? await toBase64.encode(user.image) : null

            const responce = {
                id: user._id,
                username: user.username,
                surName: user.surName,
                firstName: user.firstName,
                middleName: user.middleName,
                permission: user.permission,
                image
            }
            res.json({ ...responce, ...tokens })

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    },
    refreshToken: async (req, res) => {
        const payload = req.payload
        try {
            const { refreshToken } = await User.findOne({ _id: payload.userId })

            if (payload.token === refreshToken) {
                const tokens = await updateTokens(payload.userId)
                res.json(tokens)
            } else {
                return res.status(400).json({ message: 'Token invalid!, ( he-he:) )' })
            }

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
}