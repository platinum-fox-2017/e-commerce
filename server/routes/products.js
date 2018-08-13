var express = require('express');
var router = express.Router();
const {index, create, update, destroy} = require('../controllers/ProductController.js');
const {auth} = require('../middlewares/auth.js');
const {upload, uploadToGCS} = require('../middlewares/upload.js');

/* GET home page. */
router.get('/', index);
router.use(auth);
router.post('/',upload.single('image'), uploadToGCS, create);
router.put('/:id/edit', update);
router.delete('/:id', destroy);

module.exports = router;
