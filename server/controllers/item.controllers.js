const Item = require('../models/item')

const AddItem = (req, res) => {
    const item = new Item()
    item.name = req.body.name
    item.description = req.body.description
    item.price = req.body.price
    item.stock = req.body.stock

    item.save()
        .then((data) => {
            res.status(201).json({
                message: 'item created',
                data
            })
        })
        .catch((err) => {
            res.status(500).json({
                err
            })
        })
}

const showAllItems = (req, res) => {
    Item.find({})
        .then((items) => {
            res.status(200).json({
                items
            })
        })
}

// show detail item
const showItem = (req, res) => {
    const id = req.params.itemId
    Item.findById(id, (err, item) => {
        if (err) {
            res.status(500).json({
                err
            })
        } else {
            res.status(200).json({
                item
            })
        }
    })
}

// update item
const updateItem = (req, res) => {
    const id = req.params.itemId
    Item.findByIdAndUpdate(id, req.body, (err, item) => {
        if (err) {
            res.status(500).json({
                err
            })
        } else {
            res.status(201).json({
                item
            })
        }
    })
}

module.exports = {
    AddItem,
    showAllItems,
    showItem,
    updateItem
}