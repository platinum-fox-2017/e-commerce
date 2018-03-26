const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  cartTotal: Number,
  carts:[{
    quantity: Number,
    total: Number,
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    }
  }]
})

const Transaction = mongoose.model('Transaction', TransactionSchema)
module.exports = Transaction