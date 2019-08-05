const mongoose   = require('mongoose')
const Schema     = mongoose.Schema

const itemSchema = new Schema({
    picture : String,
    title : String,
    descripsi  : String,
    stock : Number,
    harga : Number
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;
