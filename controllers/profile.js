const User = require('../models/User')
const toBase64 = require('../helpers/encodeBase64')


module.exports = {
    getUserProfile: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.userId })
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
            res.json(responce)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    },
    updateUserProfile: async (req, res) => {
        try {
            const updateUser = await User.findOneAndUpdate({ _id: req.userId }, { ...req.payload }, { new: true })

            if (updateUser.image) {
                const image = await toBase64.encode(updateUser.image, req.imageType)

                const responce = {
                    id: updateUser._id,
                    username: updateUser.username,
                    surName: updateUser.surName,
                    firstName: updateUser.firstName,
                    middleName: updateUser.middleName,
                    permission: updateUser.permission,
                }
                res.status(201).json({ ...responce, image })
            } else {
                res.status(201).json(updateUser)
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    }
}
