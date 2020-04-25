// Node Modules
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

// Config
const app = express()
require('dotenv').config()
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())
app.use(cors())

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