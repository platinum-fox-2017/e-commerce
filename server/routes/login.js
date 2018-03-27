const express = require('express');
const router = express.Router();

const {createUser, signIn, signInFb, createAdmin, signInAdmin, testJwt} = require('../controllers/userController')
const {authUser} = require('../middlewares/auth')

router.get('/',function(req,res){
  res.status(200).json({
    message:"test login router"
  })
})
router.post('/signup', createUser)
router.post('/signin',signIn)
router.post('/fbsignin',signInFb)
router.post('/admin/signup',createAdmin)
router.post('/admin/signin',signInAdmin)
router.get('/testjwt', authUser, testJwt)
// router.post('/signup',function(req,res){
// res.status(200).json({
//   message:"tes signup user"
// })
// })
module.exports = router;