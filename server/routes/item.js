const express = require('express');
const router = express.Router();
const multer = require('multer')
const uploadImage = require('../middlewares/uploadGCS')
const {showItem,addItem,updateItem,removeItem} = require('../controllers/item.controller')

const uploadDisk = multer({
  storage:multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

router.get('/',showItem)
router.post('/',uploadDisk.single('image'),uploadImage.sendUploadToGCS,addItem)
router.put('/:id',updateItem)
router.delete('/:id',removeItem)

module.exports = router