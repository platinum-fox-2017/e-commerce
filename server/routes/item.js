const express = require('express')
const router = express.Router()
const { getAllItems, getItemById, createItem, deleteItem, updateItem} = require('../controllers/item.controller.js')

router.get('/', getAllItems)
router.get('/:id', getItemById)
router.post('/', createItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

module.exports = router