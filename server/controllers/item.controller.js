const Item = require('../models/item.model.js')

module.exports = {
  createItem: (req, res) => {
    Item.create({
      name: req.body.name,
      category: req.body.category,
      type: req.body.type,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    })
      .then(item => {
        res.status(200).json({
          message: 'Item successfully created',
          item 
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'Unable to create item',
          err
        })
      })
  },
  deleteItem: (req, res) => {
    Item.findByIdAndRemove(req.params.id)
      .exec()
      .then(item => {
        res.status(200).json({
          message: 'Item record deleted',
          item
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'Unable to delete record'
        })
      })
  },
  updateItem: (req, res) => {
    console.log(req.body.name)
    Item.findByIdAndUpdate(req.params.id, {
      ...req.body
    })
      .exec()
      .then(item => {
        res.status(200).json({
          message: 'Item updated successfully',
          item
        })
      })
      .catch(err => {
        res.status(401).json({
          message: 'Unable to update item',
          err
        })
      })
  },
  getAllItems: (req, res) => {
    Item.find()
      .exec()
      .then(items => {
        res.status(200).json({
          message: 'Items successfully retrieved',
          items
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'Unable to retrieve items',
          err
        })
      })
  },
  getItemById: (req, res) => {
    Item.findById(req.params.id)
      .exec()
      .then(item => {
        res.status(200).json({
          message: 'Item data retrieved',
          item
        })
      })
      .catch(err => {
        res.status(401).json({
          message: 'Item not found',
          err
        })
      })
  },
}