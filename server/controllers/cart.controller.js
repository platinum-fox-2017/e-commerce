const Cart = require('../models/cart.model');

module.exports = {
    findAll: (req, res) => {
        Cart.find((err, cart) => {
            if (err) res.status(500).send({ message: err });

            res.status(200).send({
                message: 'find all cart',
                cart
            });
        }).populate('item')
    },

    findById: (req, res) => {
        Cart.findById(req.params.id, (err, cart) => {
            if (err) res.status(500).send({ message: err });

            res.status(200).send({
                message: 'find all cart',
                cart
            });
        }).populate('item')
    },

    insert: (req, res) => {
        new Cart(req.body).save(err => {
            if (err) res.status(500).send({ message: err });

            res.status(201).send({
                message: `add ${ req.body._id } to cart`
            });
        })
    },

    edit: (req, res) => {
        Cart.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, cart) => {
            if (err) res.status(500).send({ message: err });
            
            res.status(200).send({
                message: `update quantity ${ cart._id }`,
                item
            });
        })
    },

    drop: (req, res) => {
        Cart.findByIdAndRemove(req.params.id, (err, cart) => {
            if (err) res.status(500).send({ message: err });

            res.status(200).send({
                message: `drop ${ cart._id } from cart`
            });
        });
    },

    getTotal: (req, res) => {
        Cart.count({}, (err, count) => {
            console.log(err, count)
            if (err) res.status(500).send({ message: err });

            res.status(200).send({
                message: `get total item`,
                data: count
            });
        });
    }
};