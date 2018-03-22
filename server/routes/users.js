const express = require('express');
const router = express.Router();

const {signUp,signIn,signInFb,createAdmin,testJwt} = require('../controllers/userController')
const {authUser} = require('../middlewares/auth')

router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/fbsignin',signInFb)
router.post('/admin/signup',createAdmin)
router.post('/admin/signin',signIn)
router.get('/testjwt', authUser, testJwt)

module.exports = router