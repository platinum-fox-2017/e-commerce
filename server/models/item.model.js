const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: String,
  category: String,
  type: String,
  price: Number,
  stock: Number,
  description: String,
  imageUrl: String
})

module.exports = mongoose.model('Item', itemSchema)