const Item = require('../models/item')

const AddItem = (req, res) => {
    const item = new Item()
    item.name = req.body.name
    item.description = req.body.description
    item.price = req.body.price

    item.save()
        .then((data) => {
            res.status(201).json({
                message: 'item created'
            })
        })
        .catch((err) => {
            res.status(500).json({
                err
            })
        })
}

module.exports = {
    AddItem
}