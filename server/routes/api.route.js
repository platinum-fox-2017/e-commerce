const express = require('express');
const router = express.Router();

module.exports = router
    .get('/', (req, res) => res.status(200).send({
        message: 'Welcome to E-Commerce-API'
    }))
    .use('/categories', require('./category.route'))
    .use('/items', require('./item.route'))
    .use('/cart', require('./cart.route'))