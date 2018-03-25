const express = require('express')
const router = express.Router()
const multer = require('multer')
const { getAllItems, getItemById, createItem, deleteItem, updateItem } = require('../controllers/item.controller.js')
const { sendUploadToGCS, uploadMem } = require('../middleware/upload')

const upload = multer({
  storage: multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

router.get('/', getAllItems)
router.get('/:id', getItemById)
// router.post('/', createItem)
router.post('/', upload.single('image'), sendUploadToGCS, createItem)
router.post('/:id', upload.single('image'), sendUploadToGCS, updateItem)
router.delete('/:id', deleteItem)

module.exports = router