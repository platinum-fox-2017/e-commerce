const Cart = require('../models/cart.model');
const mongoose = require('mongoose');

module.exports = {
    findAll: (req, res) => {
        Cart.findOne({}, (err, cart) => {
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
        Cart.findOne({}, (err, cart) => {
            if (!cart) {
                let newCart = new Cart();
                newCart.item.push(req.body.item);

                newCart.save(err => {
                    if (err) res.status(500).send({ message: err });     
                    res.status(201).send({
                        message: `add ${ req.body.item } to cart`
                    });
                });
            } else {
                cart.item.push(req.body.item);
                
                cart.save(err => {
                    if (err) res.status(500).send({ message: err });     
                    res.status(201).send({
                        message: `add ${ req.body.item } to cart`
                    });
                });
            }
        });
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
        Cart.findOne({}, (err, cart) => {
            cart.item = cart.item.filter(item => item != req.params.id);
            
            cart.save(err => {
                if (err) res.status(500).send({ message: err });     
                res.status(200).send({
                    message: `drop item from cart`
                });
            });
        });
    },

    dropAll: (req, res) => {
        Cart.findOneAndRemove({}, (err, cart) => {
            console.log(cart)
            if (err) res.status(500).send({ message: err });
            res.status(200).send({
                message: `drop item from cart`
            });
        })
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