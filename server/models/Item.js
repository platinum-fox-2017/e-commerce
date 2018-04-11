const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const itemSchema = new Schema({
    name    : String,
    description: String,
    category : String,
    picture : String,
    price : Number
})

let Item = mongoose.model('Item', itemSchema)

module.exports = Item;