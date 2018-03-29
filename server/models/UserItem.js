const mongoose   = require('mongoose')
const Schema     = mongoose.Schema

const useritemSchema = new Schema({
  userid:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  itemid:{
    type:Schema.Types.ObjectId,
    ref:'Item'
  },
  qty:Number,
  totalbiaya:Number,
  sold:Boolean
})

const UserItem = mongoose.model('UserItem', useritemSchema)

module.exports = UserItem;
