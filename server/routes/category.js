const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth')
const { home, create, update, destroy  } = require('../controllers/category')

router.get('/', home)
router.post('/', create )
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router;
