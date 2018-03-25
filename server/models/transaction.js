const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  itemId:{
  type: Schema.Types.ObjectId,
  ref: 'Item'
  },
  price:Number,
  quantity: Number,
  status: String,
  createdAt: { 
    type: Date,
    default: Date.now
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction
 