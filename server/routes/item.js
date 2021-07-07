const express = require('express');
const router = express.Router();
const multer = require('multer')
const uploadImage = require('../middlewares/uploadGCS')
const {showItem,addItem,removeItem} = require('../controllers/item.controller')
const {authUser} = require('../middlewares/auth')
const upload = multer({
  storage:multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

router.get('/',showItem)
router.post('/',addItem)
// router.post('/',upload.single('image'),uploadImage.sendUploadToGCS,addItem)
// router.delete('/:id',removeItem)

module.exports = router