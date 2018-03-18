const express = require('express');
const router = express.Router();
const multer = require('multer');
const { findAll, findById, insert, edit, drop } = require('../controllers/item.controller');
const { upload } = require('../middlewares/upload-item.multer')

const limit = multer({
    storage: multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})

module.exports = router
    .get('/', findAll)
    .get('/:id', findById)
    .post('/', limit.single('image'), upload, insert)
    .put('/:id', edit)
    .delete('/:id', drop)