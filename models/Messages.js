const { Schema, model } = require('mongoose')

const schema = new Schema({
  senderId: { type: String, required: true },
  recipientId: { type: String, required: true },
  roomId: { type: String, required: true },
  text: { type: String, required: true },
})

module.exports = model('Messages', schema)