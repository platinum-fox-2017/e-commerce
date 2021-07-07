const mongoose = require('mongoose');
const Schema = mongoose.Schema

const itemSchema = Schema({
  name : {
    type: String,
    ref: 'None'
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  image: {
    type: String,
    default: '-'}
},{
  timestamps: true
})

const item = mongoose.model('Item', itemSchema)
module.exports = item
