const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const cors = require('cors')

const mongoose = require('mongoose')
const db = mongoose.connection;
const dbURL = 'mongodb://localhost:27017/e-commerce';

const index  = require('./routes/index')
const item  = require('./routes/item')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

mongoose.connect(dbURL, err => {
  if(!err)
    console.log('Connected to database');
  else
    console.log('Error Connect to database');
});

app.use('/', index)
app.use('/item', item)

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
