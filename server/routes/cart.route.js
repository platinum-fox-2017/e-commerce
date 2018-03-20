const express = require('express');
const router = express.Router();
const { findAll, findById, insert, edit, drop, getTotal } = require('../controllers/cart.controller');

module.exports = router
    .get('/', findAll)
    .get('/:id', findById)
    .get('/count', getTotal)
    .post('/', insert)
    .put('/:id', edit)
    .delete('/:id', drop)