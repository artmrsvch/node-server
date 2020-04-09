const User = require('../models/User')
const Token = require('../models/Token')

const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const authHelper = require('../helpers/authHelper')


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
            const user = new User(userData)

            await user.save()

            res.status(201).json({ message: 'Пользователь успешно зарегистрирован', data: { ...userData, password } })

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

            const tokens = authHelper.generateTokens(user._id)
            const tokenModel = new Token({ userId: user._id, tokenId: tokens.refreshToken })

            await tokenModel.save()
            console.log('res', tokens)
            res.json({ username, ...tokens })

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    },
    refreshToken: async (req, res) => {

    }
}