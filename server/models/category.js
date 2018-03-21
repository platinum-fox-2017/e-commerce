const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema (
  {
    name: String
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('category', categorySchema)