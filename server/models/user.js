const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema (
    {
        name: String,
        email: String,
        imgUrl: String,
        role: {
          type: String,
          default: 'user'
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('user', userSchema)