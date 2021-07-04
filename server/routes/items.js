const express = require('express');
const router = express.Router();
const { getAllItems, addItems, editItems, deleteItems } = require('../controllers/items.controller')
const { addToCart, showCart} = require('../controllers/itemCons')

/* GET users listing. */
router.get('/', getAllItems)
router.post('/', addItems)
router.put('/:_id', editItems)
router.delete('/:_id', deleteItems)
router.get('/cart', showCart)
router.post('/cart', addToCart)

module.exports = router;
