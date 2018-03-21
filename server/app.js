const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

const api = require('./routes/api')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())


app.use('/api', api);

mongoose.connect(process.env.MONGODB, function (err) {
    if (err) {
        throw new Error()
    }
    console.log('E-commerce MongoDB is connected!')
})

app.listen(process.env.PORT, () =>
    console.log('listening on port ' + process.env.PORT))