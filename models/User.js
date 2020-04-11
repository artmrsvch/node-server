const { Schema, model } = require('mongoose')

const schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    surName: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    permission: {
        chat: { C: Boolean, D: Boolean, R: Boolean, U: Boolean },
        news: { C: Boolean, D: Boolean, R: Boolean, U: Boolean },
        settings: { C: Boolean, D: Boolean, R: Boolean, U: Boolean }
    },
    image: { type: String },
    refreshToken: { type: String }
})

module.exports = model('User', schema)