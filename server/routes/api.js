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
    AddItem,
    showAllItems,
    showItem,
    updateItem
} = require('../controllers/item.controllers')

// public
router.get('/items', showAllItems)
router.get('/items/:itemId', showItem)

// admin
router.post('/admin/create', createAdmin)
router.post('/admin/login', loginAdmin)


// item admin only
router.post('/admin/additem', AddItem)
router.put('/admin/items/:itemId', updateItem)

module.exports = router