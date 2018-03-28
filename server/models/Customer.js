const mongoose      = require('mongoose')
const Schema        = mongoose.Schema

const customerSchema    = new Schema({
    id_fb    : String,
    name     : String,
    username : String,
    password : String,
    email    : String,
    gender    : String,
    picture  : String
})

const Customer = mongoose.model('Customer', customerSchema)

customerSchema.pre('save', function(next) {
    var self = this
    if(self.username) {
        Customer.find({
            $or : [
                {email : self.email},
                {username : self.username}
            ]
        })
        .exec()
        .then((customer) => {
            if (customer.length) {
                next(new Error(`Username or Email already taken !`))
            } else {
                next()
            }
        })
    } else {
        Customer.find({
        })
        .exec()
        email : self.email
        .then((customer) => {
            if (customer.length) {
                next(new Error(`Username or Email already taken !`))
            } else {
                next()
            }
        })
    }
})

module.exports = Customer;