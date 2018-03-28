const express           = require('express');
const router            = express.Router();
const itemController    = require('../controllers/ItemController');
const {sendUploadToGCS} = require('../middlewares/uploadGCS') 
const multer            = require('multer')

const upload = multer({
    storage  : multer.memoryStorage(),
    limits   : {
      fileSize: 10*1024*1024
   } 
})

router.get('/', itemController.getAllItem);
router.get('/:id', itemController.getItemById);
router.post('/', upload.single('itemphoto'), sendUploadToGCS ,itemController.create);
router.delete('/:id', itemController.deleteById)

module.exports = router;