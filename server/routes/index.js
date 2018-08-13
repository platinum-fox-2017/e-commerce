var express = require('express');
var router = express.Router();
const {token} = require('../middlewares/auth.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ message: "Welcome to Ecommerce API" });
});

router.post('/api/token',token);

module.exports = router;
