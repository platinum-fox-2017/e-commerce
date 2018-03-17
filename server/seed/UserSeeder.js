const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerce');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const hash = bcrypt.hashSync('rahasia', 10);

User.remove({},function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log("Berhasil Di Hapus");
    }
});

let user = User({
  username: 'admin@gmail.com',
  password: hash
  }) ;

user.save(function(err){
    if(err) {
      console.log(err);
      }else {
        console.log('Berhasil Di Tambah')
      }
})

