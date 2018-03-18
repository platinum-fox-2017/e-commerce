const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema (
    {
        name: String,
        email: String,
        imgUrl: String
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('user', productSchema)