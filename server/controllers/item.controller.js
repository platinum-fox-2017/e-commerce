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
      sku : req.body.sku,
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      price : req.body.price,
      image: req.body.image,
      // image: req.file.cloudStoragePublicUrl,
    }
    console.log(input)
    Item.findOne({
      sku:req.body.sku
    }).then(data=>{
      if(data){
        res.status(400).json({
          message:"item sku already registered!"
        })
      }else{
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