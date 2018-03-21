var express = require('express');
var router = express.Router();
var cartcontroller  = require('../controllers/cartcontroller')
var auth            = require('../midleware/auth')
const {upload} = require('../midleware/upload.js');


/* GET home page. */
router.post('/', cartcontroller.signin);
router.get('/', auth.check,cartcontroller.signintoken);
router.post('/additems',upload.single('picture'),cartcontroller.additems);
router.get('/showitems', cartcontroller.showitems);
router.delete('/:id', cartcontroller.deleteitem);
router.put('/:id', cartcontroller.updateitem);
router.post('/addtocart', cartcontroller.addtocart);
router.get('/showsellitem', cartcontroller.showsellitem);
router.delete('/deletesellitem/:userid/:itemid', cartcontroller.deletesellitem);

module.exports = router;
