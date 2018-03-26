const Transaction = require("../models/transaction")
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const checkout = (req,res) => {
  var decoded = jwt.verify(req.headers.userid, process.env.JWT);
  const transaction = new Transaction()
  transaction.userId = decoded.id
  transaction.cartTotal = req.body.total
  transaction.carts = req.body.carts
  transaction.save()
  .then((data)=>{
    res.status(201).json({
      message: 'transaction created',
      data
    })
  })
  .catch((err) => {
    res.status(500).json({
        err
    })
  })
}

const alltransaction = (req,res) => {
  var decoded = jwt.verify(req.headers.userid, process.env.JWT);
  Transaction.find({
    userId: decoded.id
  })
  .populate('carts')
  .then((datas)=>{
    // console.log(datas[0].carts[0].name)
    res.status(200).json({
      datas
    })
  })
}

module.exports = { checkout, alltransaction }