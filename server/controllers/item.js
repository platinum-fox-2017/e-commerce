const item = require('../models/item')
const jwt = require('jsonwebtoken');

module.exports = {
  addItem: function (req, res) {
    let price = Number(req.body.price)
    const items = new item()
    items.name = req.body.name
    items.description = req.body.description
    items.price = price
    items.image = req.body.image
    items.save().then(data_item => {
      res.status(201).json({
        message: 'success create Item',
        data_item
      })
    })
  },
  showItem: function (req, res) {
    item.find().then(data_item => {
      res.status(200).json({
        message: 'list item',
        data_item
      })
    })
  }
}
