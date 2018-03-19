const User = require('../models/User')
const FB   = require('fb')
const jwt  = require('jsonwebtoken')

module.exports = {

  signin : (req,res) => {
      FB.setAccessToken(req.body.data);
      FB.api('me', {fields: ['id' , 'name', 'email', 'gender', 'picture'], access_token: req.body.data}, function(userData) {
              User.findOne({
              email : userData.email
          })
          .exec()
          .then((user) => {
              if (user) {
                  let token = jwt.sign({userId : user._id, idFb : user.fb_id, email : user.email}, process.env.SECRET)
                  res.status(200).json({
                      message : `Login success`,
                      data : {
                        token   : token,
                        tokenfb   : req.body.data,
                      },
                  })
              } else {
                  User.create({
                      id_fb : userData.id,
                      email : userData.email,
                      picture : userData.picture.data.url,
                      gender : userData.gender,
                      status : 'user'
                  }, (err,newUser) => {
                      if (err) {
                          res.status(500).json({
                              message : `Failed to create new account`,
                              data    : {}
                          })
                      }

                      let token = jwt.sign({userId : newUser._id, fbId : newUser.id_fb, email : newUser.emai},process.env.SECRET)

                      res.status(200).json({
                          message : `New account created, login success !`,
                          data    : {
                            token   : token,
                            tokenfb   : req.body.data,
                          }
                      })
                  })
              }
          })
      })
  },
  signintoken : (req,res) => {
    let token=req.headers.token
    let decoded  = jwt.verify(token, process.env.SECRET)
    FB.setAccessToken(req.headers.tokenfb);
    FB.api('me', {fields: ['id' , 'name', 'email', 'gender', 'picture'], access_token: req.headers.tokenfb}, function(userData) {
      res.status(200).json({
            message : `Selamat, token anda berhasil !`,
            name: userData.name
      })
    })
  }
}
