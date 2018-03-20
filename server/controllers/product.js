const Product = require('../models/product')

module.exports = {
  home: (req, res, next) => {
    Product
      .find()
      .then(products => {
        res.json(products)
      })
      .catch(err => {
        next(err)
      })
  },
  create: function(req, res, next) {
    console.log(req.decoded, req.body);
    Product
      .create({
        name: String(req.body.name), 
        price: Number(req.body.price), 
        stock: Number(req.body.stock), 
        category: String(req.body.category), 
        imageURL: String(req.body.imageURL)
      })
      .then(data => {
        res.status(201).send({
          message: '1 product created',
          data
        })
      }) 
      .catch(err => {
        next(err);
      })  
  },
  update: function(req, res, next) {
    console.log(req.decoded, req.body);
    Product
      .findByIdAndUpdate(req.params.id,{
        name: String(req.body.name), 
        price: Number(req.body.price), 
        stock: Number(req.body.stock), 
        category: String(req.body.category), 
        imageURL: String(req.body.imageURL)
      })
      .then(data => {
        res.status(200).send({
          message: '1 product updated',
          data
        })
      }) 
      .catch(err => {
        next(err);
      })  
  },
  destroy: (req, res, next) => {
    Product
      .findByIdAndRemove(req.params.id)
      .then(product => {
        res.json(product)
      })
      .catch(err=>{
        next(err)
      })
  }
}