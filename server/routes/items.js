const express = require('express');
const router = express.Router();
const multer = require('multer')
const {listItem, addItem, editItem, removeItem} = require('../controllers/controller.items')
const {sendUploadToGCS} = require('../middleware/uploadGCS')

const upload = multer({
    storage : multer.memoryStorage(),
    limits :{
        fieldSize:10*1024*1024
    }
})

router.get('/', listItem);
// router.post('/',addItem);
// router.post('/', upload.single('avatar'),sendUploadToGCS,function (req, res) {
//     res.status(200).json({
//       "req.body" : req.body,
//       "req.file":req.file
//     })
// });
router.post('/', upload.single('avatar'),sendUploadToGCS,addItem);
router.put('/:id', editItem);
router.delete('/:id', removeItem);

module.exports = router;
