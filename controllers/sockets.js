const Messages = require('../models/Messages')

const users = new Array

module.exports = {
  socketHandler: function (socket) {
    socket.on('users:connect', ({ userId, username }) => {
      console.log('a user connected')

      const candidate = {
        username,
        socketId: socket.id,
        userId,
        activeRoom: null
      }
      users.push(candidate)

      socket.emit('users:list', users)
      socket.broadcast.emit('users:add', candidate);
    })
      .on('message:add', async message => {
        let dialog = new Object

        const newMessage = new Messages(message)
        await newMessage.save()

        users.forEach(user => {
          if (user.userId === message.recipientId) dialog.to = user.socketId
          if (user.userId === message.senderId) dialog.from = user.socketId
        })

        dialog.from === dialog.to
          ? socket.emit('message:add', message)
          : this.to(dialog.from).to(dialog.to).emit('message:add', message);
      })
      .on('message:history', async dialog => {
        console.log(dialog)
        const isMatchPersons = (dialog, msg) => {
          if ((dialog.recipientId === msg.recipientId
            && dialog.userId === msg.senderId)
            || (dialog.recipientId === msg.senderId
              && dialog.userId === msg.recipientId)) {
            return true
          }
          return false
        }
        const arcive = (await Messages.find()).filter(msg => isMatchPersons(dialog, msg) ? true : false)

        console.log('arcive', arcive)
        socket.emit('message:history', arcive)
      })
      .on('disconnect', () => {
        users.forEach((user, index) => {
          if (user.socketId === socket.id) users.splice(index, 1)
        })

        socket.broadcast.emit('users:leave', socket.id)
      });
  }
}