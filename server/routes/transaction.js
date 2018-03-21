const express = require('express');
const router = express.Router();

const {showTransaction, addTransaction, updateTransaction, removeTransaction} = require('../controllers/transaction.controller')


router.get('/',showTransaction)
router.post('/',addTransaction)
router.put('/:id',updateTransaction)
router.delete('/:id',removeTransaction)

module.exports = router