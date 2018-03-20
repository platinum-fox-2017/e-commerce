const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Item', new Schema({
    title: String,
    description: String,
    category: { type: Schema.ObjectId, ref: 'Category' },
    url: String,
    price: Number,
    stock: Number
}));