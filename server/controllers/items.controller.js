const {Item} = require('../models/items')

module.exports = {
    getAllItem (req, res) {
        Item.find()
        .exec()
        .then(items => {
            res.status(200).json({
                message: 'List Item',
                items
            })
        })
    },
    addItem (req, res) {
        const {artist, album, price} = req.body
        const item = new Item()
        item.artist = artist
        item.album = album
        item.price = price
        item.save()
        .then(itemData => {
            res.status(201).json({
                message: 'New Item added',
                itemData
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Failed add new Item',
                err
            })
        })
    },
    editItem (req, res) {
        Item.findOneAndUpdate({_id : req.params._id}, {$set: req.body}, {upsert: true}, (err, r) => {
            if(err){
                res.status(400).json({
                    message: 'Edit failed',
                    err
                })
            } else {
                res.status(200).json({
                    message: 'Edit successfull',
                    data: req.body
                })
            }
        })
    },
    deleteItem (req, res) {
        Item.remove({_id : req.params._id}, (err, r) => {
            if(err){
                res.status(400).json({
                    message: 'Delete failed',
                    err
                })
            } else {
                res.status(200).json({
                    message: 'Delete successfull'
                })
            }
        })
    }
}