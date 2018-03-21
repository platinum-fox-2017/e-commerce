const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let transactionSchema = new Schema (
    {
        UserId : {
          type: Schema.Types.ObjectId,
          ref: 'user'
        },
        ProductId : {
          type: Schema.Types.ObjectId,
          ref: 'product'
        },
        qty_buy: Number 
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('transaction', transactionSchema)