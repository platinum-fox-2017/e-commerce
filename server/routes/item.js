const express = require('express');
const router = express.Router();

const {showItem,addItem,updateItem,removeItem} = require('../controllers/item.controller')


router.get('/',showItem)
router.post('/',addItem)
router.put('/:id',updateItem)
router.delete('/:id',removeItem)

module.exports = router