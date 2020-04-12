const User = require('../models/User')
const toBase64 = require('../helpers/encodeBase64')

const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const userlist = await User.find()

            const formattedUserList = await Promise.all(userlist.map(async user => {
                const image = user.image ? await toBase64.encode(user.image) : null
                return {
                    id: user._id,
                    username: user.username,
                    surName: user.surName,
                    firstName: user.firstName,
                    middleName: user.middleName,
                    permission: user.permission,
                    image
                }
            }))
            res.status(201).json(formattedUserList)

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    }
}