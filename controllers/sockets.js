const users = []

module.exports = {
  socketHandler: function (socket) {
    console.log('a user connected');
    socket.on('users:connect', ({ userId, username }) => {

      const newUser = {
        username,
        socketId: socket.id,
        userId,
        activeRoom: null
      }
      users.push(newUser)

      socket.emit('users:list', users)
      socket.broadcast.emit('users:add', newUser);

    })
      .on('message:add', message => {
        console.log(message)
        io.sockets.in(`${message.roomId}`).emit('message:add', message);
        //
        //socket.emit('message:add', message)
      })
      .on('disconnect', () => {
        users.forEach((user, index) => {
          if (user.socketId === socket.id) users.splice(index, 1)
        })

        socket.broadcast.emit('users:leave', socket.id)
      })
  }
}