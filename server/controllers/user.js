const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
  login: (req,res,next) => {
    User.findOne({
      email : req.fb.email,
      role: 'user'
    })
      .then(user => {
        if(user){
          res.send({
            user: user,
            token: jwt.sign({
              user: user
            }, 'secretKey')
          })
        } else {
          User.create({
            email: req.fb.email,
            name: req.fb.name,
            imgUrl: req.fb.picture.data.url,
            role: 'user'
          })
            .then(userCreate => { 
              res.send({
                user: userCreate,
                token: jwt.sign({
                  user: userCreate
                }, 'secretKey')
              })
            })
            .catch(err => {
              next(err)
            })
        }
      })
      .catch(err => {
        next(err)
      })
  },

  loginAdmin: (req,res,next) => {
    User.findOne({
      email : req.fb.email,
      role: 'admin'
    })
      .then(user => {
        if(user){
          res.send({
            user: user,
            token: jwt.sign({
              user: user
            }, 'secretKey')
          })
        } else {
          User.create({
            email: req.fb.email,
            name: req.fb.name,
            imgUrl: req.fb.picture.data.url,
            role: 'admin'
          })
            .then(userCreate => { 
              res.send({
                user: userCreate,
                token: jwt.sign({
                  user: userCreate
                }, 'secretKey')
              })
            })
            .catch(err => {
              next(err)
            })
        }
      })
      .catch(err => {
        next(err)
      })
  },

  getUsers: (req, res, next) => {
    User
      .find()
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        next(err)
      })
  },
  findUser: (req, res, next) => {
    User  
      .findOne()
  }
}