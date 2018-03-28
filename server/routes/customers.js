const express = require('express');
const router = express.Router();
const customerController = require('../controllers/CustomerController');

router.post('/signin', customerController.signIn);
router.post('/signup', customerController.signUp);
router.post('/signinfb', customerController.signInFb);

module.exports = router;