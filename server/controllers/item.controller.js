const Item = require('../models/item.model');
const Category = require('../models/category.model');

module.exports = {
    findAll: (req, res) => {
        Item.find((err, items) => {
            if (err) res.status(500).send({ message: err });
            
            res.status(200).send({
                message: 'find all item',
                items
            });
        }).populate('category')
    },

    findById: (req, res) => {
        Item.findById(req.params.id, (err, item) => {
            if (err) res.status(500).send({ message: err });

            res.status(200).send({
                message: 'find item',
                item
            });
        }).populate('category')
    },

    insert: (req, res) => {
        let item = new Item(req.body);

        item.save(err => {
            console.log(err);
            if (err) res.status(500).send({ message: err });

            res.status(200).send({
                message: `insert item ${ req.body.title }`,
                item
            });
        });
    },

    edit: (req, res) => {
        Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, item) => {
            if (err) res.status(500).send({ message: err });
            
            res.status(200).send({
                message: `update item ${ item.title }`,
                item
            });
        }).populate('category')
    },

    drop: (req, res) => {
        Item.findByIdAndRemove(req.params.id, (err, item) => {
            if (err) res.status(500).send({ message: err });
            
            res.status(200).send({
                message: `delete item ${ item.title }`,
                item
            });
        })
    }
}