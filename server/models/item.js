const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  sku:  String,
  title: String,
  description: Text,
  price : Number,
  stock : Number,
  imgUrl : String,
  imgAlt : String,
  createdAt: { 
    type: Date,
    default: Date.now
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item
 