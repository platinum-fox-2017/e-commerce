const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema (
    {
        name: String,
        price: Number,
        stock: Number,
        category: String,
        imageURL: String,
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('product', productSchema)


