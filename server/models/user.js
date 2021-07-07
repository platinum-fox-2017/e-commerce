const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id_fb: String,
  name: String,
  email: String,
  role: String,
  password: String
});

const User = mongoose.model('User', userSchema);
module.exports = User
