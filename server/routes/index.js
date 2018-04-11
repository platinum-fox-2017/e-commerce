const express       = require('express');
const router        = express.Router();
const customers     = require('./customers');
const transactions  = require('./transactions');
const items         = require('./items');
const admin         = require('./admin')

router.get('/', function(req, res, next) {
  res.send('Api work !')
});

router.use('/api/admin', admin);
router.use('/api/customers', customers);
router.use('/api/transactions', transactions);
router.use('/api/items', items);

module.exports = router;