const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemConsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  itemId: {
    type: SChema.Types.ObjectId,
    ref: 'Item'
  },
  quantity: Number,
  totalPrice: Number
})

const ItemCons = mongoose.model('ItemCons', itemConsSchema)

module.exports = {ItemCons}