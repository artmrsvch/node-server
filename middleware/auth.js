const { check } = require('express-validator')

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
    ]
}