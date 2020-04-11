const fs = require('fs')
const path = require('path')

const User = require('../models/User')





module.exports = {
    getUserProfile: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.userId })
            res.json(user)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    },
    updateUserProfile: async (req, res) => {
        try {

            //await User.findOneAndUpdate({ _id: req.userId }, {})
            console.log('req', req.payload)
            // res.json(user)

            //const candidate = await User.findOne({ username })

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    }
}