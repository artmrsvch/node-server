const { Schema, model } = require('mongoose')

const schema = new Schema({
  username: { type: String, required: true },
  userId: { type: String, required: true },
  activeRoom: { type: Boolean, required: true },
  socketId: { type: String, required: true }
})

module.exports = model('ChatUser', schema)