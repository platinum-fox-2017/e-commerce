const express = require('express');
const router = express.Router();
const product = require('./product')
const users = require('./users')
const transaction = require('./transaction')

/* GET home page. */
router.use('/product', product)
router.use('/user', users)
router.use('/transaction', transaction)

module.exports = router;
