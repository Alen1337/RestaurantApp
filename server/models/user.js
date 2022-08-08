const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roleid: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userid: {
    type: Number,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;