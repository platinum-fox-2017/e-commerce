require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000;

mongoose.connect(`mongodb://${ process.env.DB_USER }@${ process.env.DB_HOST }/${ process.env.DB_NAME }`, (err) => {
    if(!err) console.log(`connect to database ${ process.env.DB_HOST }/${ process.env.DB_NAME }`);
});

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/api.route'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});