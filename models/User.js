const { Schema, model } = require('mongoose')

const schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    surName: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
})

module.exports = model('User', schema)