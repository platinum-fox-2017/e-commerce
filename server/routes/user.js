var express = require('express');
var router = express.Router();
var {login, loginAdmin, getUsers} = require('../controllers/user')
var fbMiddle = require('../middleware/fb')

/* GET users listing. */
router.get('/login', fbMiddle,  login )
router.get('/login-admin', fbMiddle,  loginAdmin )
router.get('/', getUsers)

module.exports = router;
