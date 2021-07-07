const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userItemSchema = Schema({
  userId : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  itemId: {
    type: Schema.Types.ObjectId,
    ref: 'Item'
  },
  quantity: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  isSold: {
    type: Boolean,
    default: 'false'
  }
},{
  timestamps: true
})

const userItem = mongoose.model('UserItem', userItemSchema)
module.exports = userItem
