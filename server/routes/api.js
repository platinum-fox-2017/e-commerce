const express = require('express');
const router = express.Router();
const products = require('./product')
const users = require('./user')
const transactions = require('./transaction')
const categories = require('./category')

/* GET home page. */
router.use('/product', products)
router.use('/user', users)
router.use('/transaction', transactions)
router.use('/category', categories)

module.exports = router;
