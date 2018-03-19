var express = require('express');
var router = express.Router();
var cartcontroller  = require('../controllers/cartcontroller')
var auth                = require('../midleware/auth')


/* GET home page. */
router.post('/', cartcontroller.signin);
router.get('/', auth.check,cartcontroller.signintoken);

module.exports = router;
