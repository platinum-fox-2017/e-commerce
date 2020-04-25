const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    stock: {
        type: Number
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item