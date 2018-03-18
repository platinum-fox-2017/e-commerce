const transaction = require('../models/transaction')

module.exports = {
  home: (req,res,next) =>{
    transaction.find({
      UserId: req.decoded._id
    })
    .populate(['UserId','ProductId'])
      .then(transactions=>{
        res.json(transactions)
      })
      .catch(err=>{
        next(err)
      })
  },
  create: function(req, res, next) {
    let products = req.body.products
    products.map(e=>{
      transaction.create({
        UserId: req.decoded._id,
        ProductId: e._id,
        qty_buy: e.qty_buy
      })
      .then(()=> console.log('success'))
      .catch(err=>next(err))
    })
    res.send({msg:'Success'})  
  },
  update: function(req, res, next) {
    console.log(req.decoded, req.body);
    transaction
      .findByIdAndUpdate(req.params.id,{
        name: String(req.body.name), 
        price: String(req.body.price), 
        stock: String(req.body.stock), 
        category: String(req.body.category), 
        imageURL: String(req.body.imageURL)
      })
      .then( data => {
        res.status(201).send({
          message: '1 transaction updated',
          data
        })
      }) 
      .catch(err => {
        next(err);
      })  
  },
  destroy: (req,res,next) => {
    transaction.findByIdAndRemove(req.params.id)
      .then(transactions=>{
        res.json(transactions)
      })
      .catch(err=>{
        next(err)
      })
  }
}