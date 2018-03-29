const multer = require('multer');
//
// var upload = multer({ dest: function(req,file,cb){
//     cb(null, 'public/images')
// }, filename: function (req, file, cb) {
//   console.log(Date.now()+'.'+file.originalname.split('.').pop());
//     cb(null, Date.now()+'.'+file.originalname.split('.').pop())
//   }
// })
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'.'+file.originalname.split('.').pop())
  }
})

var upload = multer({ storage: storage })
module.exports = {upload};
