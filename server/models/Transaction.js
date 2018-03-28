const mongoose = require('mongoose')
const Schema   = mongoose.Schema

transactionSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'Customer'},
    items_purchased: [],
    address_ship: String,
    payment: String
})

let Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction