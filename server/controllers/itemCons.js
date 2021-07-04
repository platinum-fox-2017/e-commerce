const {ItemCons} = require('../models/itemCons')
const jwt = require('jsonwebtoken')

module.exports = {
  addToCart (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    ItemCons.findOne({
      userId: decoded._id,
      itemId: req.body.itemId
    })
    .then(item => {
      if(item){
        ItemCons.findOneAndUpdate({
          userId: decoded._id,
          itemId: req.body.itemId
        },{
          $set: {
            quantity: item.quantity+1,
            totalPrice: item.totalPrice/item.quantity + item.totalPrice
          }
        })
        .then(data => {
          res.status(201).json({
            message: 'Added Item to Cart',
            data
          })
        })
      } else {
        const item = new ItemCons ()
        item.userId = decoded._id
        item.itemId = req.body.itemId
        item.quantity = req.body.quantity
        item.totalPrice = req.body.totalPrice
        item.save()
        .then(data => {
          res.status(201).json({
            message: 'Added New Item to Cart',
            data
          })
        })
        .catch(err => {
          console.log(err)
        })
      }
    })
  },
  showCart (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    ItemCons.find({userId: decoded._id})
    .populate(itemId)
    .exec()
    .then(item => {
      res.status(200).json({
        message: 'Cart',
        item
      })
    })
  }
}