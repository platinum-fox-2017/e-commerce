var express = require('express');
var router = express.Router();
var {login} = require('../controllers/user')
var fbMiddle = require('../middleware/fb')
/* GET users listing. */
router.get('/login', fbMiddle,  login )

module.exports = router;
