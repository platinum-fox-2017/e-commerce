const Transaction = require('../models/transaction')

module.exports={
  showTransaction:(req,res)=>{
    Transaction.find({
      'userId': req.body.userId
    })
    .exec()
    .then(listTransaction=>{
      res.status(200).json({
        message:"success",
        listTransaction
      })
    }).catch(err=>{
      res.status(400).json(err)
    })
  },
  addTransaction:(req,res)=>{
    let input = {
      userId : req.body.userId,
      itemId: req.body.itemId,
    }
    const Transaction = new Transaction(input)
    console.log("======",Transaction);
    Transaction.save().then(data=>{
      res.status(200).json({
        message:"Transaction created",
        Transaction:data
      })
    }).catch(error=>{
      res.status(400).json({
        message:"error",
        error
      })
    })
  },
  updateTransaction:(req,res)=>{
    console.log("ini update",req.body)
    let id = {_id:req.params.id}
    let input = {
      userId : req.body.userId,
      itemId: req.body.itemId,
    }
    Transaction.findOneAndUpdate(id,input,{new:true},(err,beforeUpdate)=>{
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
  removeTransaction:(req,res)=>{
    let id = {_id:req.params.id}
    Transaction.findByIdAndRemove(id,(err,deletedTransaction)=>{
      if(!err){
        res.status(200).json({
          message:"Transaction removed!",
          data:deletedTransaction
        })
      }else{
        res.status(400).json({
          message:"error"
        })
      }
    })
  }
}