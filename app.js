const express = require('express')
const path = require("path")
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const config = require('./config')


const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", require("./routes/index"));


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


async function start() {
    try {
        await mongoose.connect(config.mongooseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(config.port, () => {
            console.log(`Run na porty ${config.port}`);
        });
    } catch (e) {
        console.log("Server error", e)
        process.exit(1)
    }
}


start()
