const express = require('express')
const app = express()
const path = require("path")
const mongoose = require('mongoose')
const bodyParser = require("body-parser");

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const config = require('./config')
const { socketHandler } = require('./controllers/sockets')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')))
}

app.use("/api", require("./routes/index"));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

io.sockets.on('connection', socketHandler)

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        http.listen(process.env.PORT || config.port, () => {
            console.log(`Run na porty ${config.port}`);
        });
    } catch (e) {
        console.log("Server error", e)
        process.exit(1)
    }
}

start()
