const express = require('express');
const router = express.Router();
const { findAll, insert, drop } = require('../controllers/category.controller');

module.exports = router
    .get('/', findAll)
    .post('/', insert)
    .delete('/:id', drop)