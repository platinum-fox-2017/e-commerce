const User = require('../models/User')
const Item = require('../models/items')
const UserItem = require('../models/UserItem')
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
                        status : user.status
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
                            status : newUser.status
                          }
                      })
                  })
              }
          })
      })
  },
  signintoken : (req,res) => {
    FB.setAccessToken(req.headers.tokenfb);
    FB.api('me', {fields: ['id' , 'name', 'email', 'gender', 'picture'], access_token: req.headers.tokenfb}, function(userData) {
      res.status(200).json({
            message : `Selamat, token anda berhasil !`,
            name: userData.name
      })
    })
  },
  additems : (req,res) => {
    let foto= req.file.path.split('/').pop()
    let descripsi=req.body.descripsi
    let title= req.body.title
    let stock= req.body.stock
    let harga= req.body.harga
    let picture = `http://localhost:3000/images/${foto}`
    let Items= new Item()
     Items.picture=picture
     Items.title=title
     Items.descripsi=descripsi
     Items.stock=stock
     Items.harga=harga
     Items.save().then(data=>{
       res.status(200).send(data)
     }).catch(error=>{
       res.status(500).send(error)
     })
  },
  showitems : (req,res) => {
    Item.find().then((item) => {
      res.status(200).send(item)
    })
  },
  deleteitem:(req,res)=>{
   Item.deleteOne({_id: req.params.id})
   .then(data=>{
     console.log('succes delete');
     res.status(200).send(data)
   }).catch(error=>{
     res.status(500).send(error)
   })
 },
  updateitem:(req,res)=>{
    Item.updateOne(
      {_id: req.params.id},
      {$set:
          {
            title:req.body.title,
            descripsi:req.body.descripsi,
            stock:req.body.stock,
            harga:req.body.harga
          }
    })
      .then(data=>{
        res.status(200).send(data)
      }).catch(error=>{
        res.status(500).send(error)
      })
  },
  addtocart:(req,res)=>{

    // res.send(req.body)
    let token=req.body.token
    let decoded  = jwt.verify(token, process.env.SECRET)
    console.log(decoded);
    UserItem.findOne({
        userid: decoded.userId,itemid:req.body.itemid
    }).then(data=>{
      if (data) {
        let changeqty=data.qty+1
        let changetotalbiaya=((data.totalbiaya/data.qty)+data.totalbiaya)
        UserItem.updateOne(
          {userid: decoded.userId,itemid:req.body.itemid},
          {$set:
              {
                qty:changeqty,
                totalbiaya:changetotalbiaya,
              }
        })
          .then(datas => {
            res.status(200).send(datas)
          }).catch(error=>{
            console.log('error update');
            res.status(500).send(error)
          })
      }else{
        let useritem= new UserItem()
        useritem.userid = decoded.userId
        useritem.itemid = req.body.itemid
        useritem.qty = req.body.qty
        useritem.totalbiaya = req.body.harga
        useritem.sold = false
        useritem.save().then(datas=>{
          res.status(200).send(datas)
        }).catch(error=>{
          console.log("ini error add first");
          res.status(500).send(error)
        })
      }
    }).catch(error=>{
      console.log("ini error add dinsonw");

      res.status(500).send(error)

    })

  },
  showsellitem:(req,res) => {
    let token=req.headers.token
    let decoded  = jwt.verify(token, process.env.SECRET)
    UserItem.find({userid: decoded.userId,sold:false}).populate('itemid').exec().then((item) => {
      res.status(200).send(item)
    })
  },
  deletesellitem:(req,res) => {
     UserItem.deleteMany({userid: req.params.userid,itemid:req.params.itemid})
     .then(data=>{
       console.log('succes delete');
       res.status(200).send(data)
     }).catch(error=>{
       res.status(500).send(error)
     })
   },
  buyitems:(req,res) => {
    UserItem.updateOne(
      {_id:req.params.id},
      {$set:
          {
            qty:req.body.qty,
            totalbiaya:req.body.totalbiaya,
            sold:req.body.sold,
          }
    })
      .then(datas => {
        res.status(200).send(datas)
      }).catch(error=>{
        console.log('error update');
        res.status(500).send(error)
      })
  }
}
