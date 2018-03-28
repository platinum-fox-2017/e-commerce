const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/TransactionController');

router.post('/', transactionController.saveTransaction);

module.exports = router;