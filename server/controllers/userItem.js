const UserItem = require('../models/useritem')
const jwt = require('jsonwebtoken');

module.exports = {
  addCart: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    console.log(req.body, 'ini body');
    console.log(decoded);
    UserItem.findOne({
      userId: decoded._id,
      itemId: req.body.itemId
    }).then(data_cart => {
      if (data_cart) {
        let updateQty = data_cart.quantity + 1
        let updateTotal = ((data_cart.totalPrice/data_cart.quantity)+data_cart.totalPrice)
        UserItem.updateOne({
          userId: decoded._id,
          itemId: req.body.itemId},
          {$set:
            {
              quantity: updateQty,
              totalPrice: updateTotal
            }
        }).then(data => {
          res.status(200).json({
            data
          }).catch(error => {
            res.status(500).json({
              message: 'error'
            })
          })
        })
      }
      else {
        const userItem = new UserItem()
          userItem.userId = decoded._id
          userItem.itemId = req.body.itemId
          userItem.quantity = req.body.quantity
          userItem.totalPrice = req.body.totalPrice
          userItem.save().then(data_cart => {
            res.status(200).json({
              message: 'success create Cart',
              // data_cart
            })
          }).catch(error => {
            console.log(error);
            res.status(500).json({
              message: 'error'
            })
          })
      }
    })
  },
  showCart: function (req, res) {
    console.log(req.headers);
    console.log('haha');
    let token = req.headers.token
    console.log(token);
    let decoded = jwt.verify(token, process.env.SECRET)
    console.log(decoded);
    UserItem.find({
      userId: decoded._id
    }).populate('itemId').exec().then(data_cart => {
      res.status(200).json({
        message: 'data cart user',
        data_cart
      })
    })
  },
  deleteCart: function (req, res) {
    // let token = req.headers.accessToken
    // let decoded = jwt.verify(token, process.env.SECRET)
    // console.log(decoded);
    console.log(req.params);
    UserItem.deleteMany({
      userId: req.params.id_user,
      itemId: req.params.id_item
    }).then(() => {
      res.status(200).json({
        message: 'data deleted'
      })
    })
  },
  updateCartMin : function (req, res) {
    let item = req.headers.itemid
    let user = req.headers.userid
    UserItem.findOne({
      userId: user,
      itemId: item
    }).then(data => {
      UserItem.updateOne({
        userId: user,
        itemId: item
      },{
        $set: {
          quantity: data.quantity -1,
          totalPrice: (data.totalPrice - (data.totalPrice/data.quantity))
        }
      }).then(() => {
        res.status(200).json({
          message: 'data updated'
        })
      })
    })
  },
  updateCartMax: function (req, res) {
    let item = req.headers.itemid
    let user = req.headers.userid
    UserItem.findOne({
      userId: user,
      itemId: item
    }).then(data => {
      UserItem.updateOne({
        userId: user,
        itemId: item
      },{
        $set: {
          quantity: data.quantity + 1,
          totalPrice: (data.totalPrice + (data.totalPrice/data.quantity))
        }
      }).then(() => {
        res.status(200).json({
          message: 'data updated'
        })
      })
    })
  },
  deleteMany: function (req, res) {
    console.log(req.headers);
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    UserItem.deleteMany({
      userId: decoded._id
    }).then(data => {
      res.status(200).json({
        message: 'success delete data'
      })
    })
  }
}
