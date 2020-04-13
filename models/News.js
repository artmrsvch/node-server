const { Schema, model } = require('mongoose')

const schema = new Schema({
    id: { type: String, required: true, unique: true },
    created_at: Date,
    text: String,
    title: String,
    user: {
        firstName: String,
        id: String,
        image: String,
        middleName: String,
        surName: String,
        username: String
    }
})

module.exports = model('News', schema)