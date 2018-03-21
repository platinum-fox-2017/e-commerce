// Node Modules
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Config
const app = express()
require('dotenv').config()
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

// MongoDB
mongoose.connect(process.env.MONGODB, function (err) {
    if (err) {
        throw new Error()
    }
    console.log('E-commerce MongoDB is connected!')
})

// Routes
const api = require('./routes/api')

app.use('/api', api);

app.listen(process.env.PORT, () =>
    console.log('listening on port ' + process.env.PORT))