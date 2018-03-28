const Transaction = require('../models/Transaction')

module.exports = {
    saveTransaction: (req,res) => {
        Transaction.create({
            user_id: req.body.userId,
            items_purchased: req.body.carts,
            address_ship: req.body.address_ship,
            payment: req.body.payment
        },(err,newItem) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: `save transaction erorr ${err}`,
                    data: {}
                })
            } else {
                console.log('saved');
                res.status(200).json({
                    message: `create item success`,
                    data: newItem
                })
            }
        })
    }
}