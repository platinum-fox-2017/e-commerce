const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  image: String,
  artist: String,
  album: String,
  price: Number,
})

const Item = mongoose.model('Item', itemSchema)

module.exports = {Item}