const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  sku:  String,
  title: String,
  category: String,
  description: String,
  price : Number,
  imgUrl : String,
  createdAt: { 
    type: Date,
    default: Date.now
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item
 