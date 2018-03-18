const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth')
const { home, create, update, destroy  } = require('../controllers/product')

router.get('/', home)
router.post('/', auth, create )
router.put('/:id', auth, update)
router.delete('/:id', auth, destroy)

module.exports = router;

