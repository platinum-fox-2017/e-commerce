const User = require('../models/user')
const jwt = require('jsonwebtoken')
module.exports = {
  login: (req,res,next)=>{
    User.findOne({
      email : req.fb.email
    })
      .then(user=>{
        if(user){
          res.send({
            user: user,
            token: jwt.sign({
              user:user
            }, 'secretKey')
          })
        }else{
          User.create({
            email:req.fb.email,
            name: req.fb.name,
            imgUrl:req.fb.picture.data.url
          })
            .then(userCreate=>{
              res.send({
                user: userCreate,
                token: jwt.sign({
                  user:userCreate
                }, 'secretKey')
              })
            })
            .catch(err=>{
              next(err)
            })
        }
      })
      .catch(err=>{
        next(err)
      })
  }
}