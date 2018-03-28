const express = require('express');
const router = express.Router();
const { getAllAdmin, addAdmin, editAdmin, deleteAdmin } = require('../controllers/admin.controller')

/* GET users listing. */
router.get('/', getAllAdmin)
router.post('/', addAdmin)
router.put('/:_id', editAdmin)
router.delete('/:_id', deleteAdmin)

module.exports = router;
