const express = require('express');
const router = express.Router();

const {showTransaction, addTransaction, updateTransaction, removeTransaction, getCheckout} = require('../controllers/transaction.controller')


router.get('/',showTransaction)
router.post('/',addTransaction)
router.put('/:id',updateTransaction)
router.delete('/:id',removeTransaction)
router.get('/checkout',getCheckout)

module.exports = router