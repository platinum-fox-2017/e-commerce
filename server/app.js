const express       = require('express');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const index         = require('./routes/index');
const cors          = require('cors')
const mongoose      = require('mongoose');
const app           = express();

require('dotenv').config()
mongoose.connect('mongodb://reynaldi:12345@ds121099.mlab.com:21099/ecommerce')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/', index);

module.exports = app;