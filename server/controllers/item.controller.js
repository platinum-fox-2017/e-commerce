const Item = require('../models/item')

module.exports={
  showItem:(req,res)=>{
    Item.find()
    .populate('userId')
    .exec()
    .then(listItem=>{
      res.status(200).json({
        message:"success",
        listItem
      })
    }).catch(err=>{
      res.status(400).json(err)
    })
  },
  addItem:(req,res)=>{
    let input = {
      sku : req.body.task,
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      price : req.body.price,
      stock : req.body.stock,
      imgUrl : req.body.imgUrl,
      imgAlt : req.body.imgAlt,
    }
    const item = new Item(input)
    console.log("======",Item);
    item.save().then(data=>{
      res.status(200).json({
        message:"Item created",
        Item:data
      })
    }).catch(error=>{
      res.status(400).json({
        message:"error",
        error
      })
    })
  },
  updateItem:(req,res)=>{
    console.log("ini update",req.body)
    let id = {_id:req.params.id}
    let input = {
      sku : req.body.task,
      title: req.body.title,
      description: req.body.description,
      price : req.body.price,
      stock : req.body.stock,
      imgUrl : req.body.imgUrl,
      imgAlt : req.body.imgAlt,
    }
    console.log(id)
    Item.findOneAndUpdate(id,input,{new:true},(err,beforeUpdate)=>{
      if(!err){
        res.status(200).json({
          message:"update success",
        })
      }else{
        res.status(400).json({
          message:"error",
          err
        })
      }
    })
  },
  removeItem:(req,res)=>{
    let id = {_id:req.params.id}
    Item.findByIdAndRemove(id,(err,deletedItem)=>{
      if(!err){
        res.status(200).json({
          message:"Item removed!",
          data:deletedItem
        })
      }else{
        res.status(400).json({
          message:"error"
        })
      }
    })
  }
}