const { Schema, model } = require('mongoose')

const schema = new Schema({
    created_at: Date,
    text: String,
    title: String,
    user: {
        firstName: String,
        id: Key,
        image: String,
        middleName: String,
        surName: String,
        username: String
    }
})

module.exports = model('News', schema)