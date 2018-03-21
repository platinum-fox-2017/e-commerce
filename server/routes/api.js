const router = require('express').Router()
const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
})

const imgUpload = require('../controllers/gcpuploader')

const {
    createAdmin,
    loginAdmin
} = require('../controllers/admin.controllers')

const {
    AddItem
} = require('../controllers/item.controllers')

router.post('/admin/create', createAdmin)
router.post('/admin/login', loginAdmin)

// item
router.post('/admin/additem', multer.single('image'), imgUpload.sendUploadToGCS, (req, res) => {
    console.log(req.file)
    console.log('masuk?')
})


module.exports = router