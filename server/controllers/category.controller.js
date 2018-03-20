const Category = require('../models/category.model');

module.exports = {
    findAll: (req, res) => {
        Category.find((err, categories) => {
            if (err) res.status(500).send({ message: err });

            res.status(200).send({
                message: 'find all category',
                categories
            });
        });
    },

    insert: (req, res) => {
        new Category(req.body).save(err => {
            if (err) res.status(500).send({ message: err });

            res.status(201).send({
                message: `insert category ${ req.body.name }`
            });
        });
    },

    drop: (req, res) => {
        Category.findByIdAndRemove(req.params.id, (err, category) => {
            if (err) res.status(500).send({ message: err });

            res.status(200).send({
                message: `delete category ${ category.name }`
            });
        });
    }
}