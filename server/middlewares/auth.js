const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

module.exports = {

  auth: (req,res,next) => {
    try {
      const decoded = jwt.verify(req.headers.token, 'secret');
      if(decoded.isAdmin){
        next();
      } else {
        res.status(500).json({
          message: "You Are Not Admin"
        });
      }

    } catch(err) {
        res.status(500).json({
          message: "Invalid Token"
        });
    }
  },
  token: (req,res) => {
    
    User.findOne({username : req.body.username}).exec().then(data => {

      if(data != null){
        const checkPassword = bcrypt.compareSync(req.body.password, data.password); // true
        if(checkPassword) {
          var token = jwt.sign({ isAdmin: true }, 'secret');
          return res.status(200).json({ token });
        } else {

          return res.status(403).json({ message: 'Credentials Wrong!' });
        }

      } else {
        return res.status(403).json({ message: 'Credentials Wrong!' });
      }

    }).catch(err => {
      res.status(500).json(err);
    })
   }
}
