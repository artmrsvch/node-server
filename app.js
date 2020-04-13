const app = require('express')()
const path = require("path")
const mongoose = require('mongoose')
const bodyParser = require("body-parser");

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const config = require('./config')
const { socketHandler } = require('./controllers/sockets')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", require("./routes/index"));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
const users = []

io.sockets.on('connection', (socket) => {
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
            io.sockets.emit('message:add', message);
        })
        .on('disconnect', () => {
            users.forEach((user, index) => {
                if (user.socketId === socket.id) users.splice(index, 1)
            })

            socket.broadcast.emit('users:leave', socket.id)
        });
})
async function start() {
    try {
        await mongoose.connect(config.mongooseUrl, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        http.listen(config.port, () => {
            console.log(`Run na porty ${config.port}`);
        });
    } catch (e) {
        console.log("Server error", e)
        process.exit(1)
    }
}

start()
