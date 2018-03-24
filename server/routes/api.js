var express = require('express');
var router = express.Router();
const { addItem,showItem } = require('../controllers/item.js');
const { addCart,showCart,deleteCart,updateCartMin,updateCartMax } = require('../controllers/userItem.js');


/* GET users listing. */
router.post('/item' , addItem)
router.get('/item' , showItem)
router.post('/cart' , addCart)
router.get('/cart' , showCart)
router.delete('/cart/:id_user/:id_item', deleteCart)
router.get('/cart/updateMin', updateCartMin)
router.get('/cart/updateMax', updateCartMax)

module.exports = router;
