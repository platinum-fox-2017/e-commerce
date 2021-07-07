const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, 'email is required!'],
    unique: true
  },
  password: String,
  role: String,
  fbId: String,
  createdAt: { 
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User
 