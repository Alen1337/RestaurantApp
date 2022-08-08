const mongoose = require('mongoose');

const LoginTokenSchema = new mongoose.Schema({
  key: String,
  userid: Number,
  createdAt: Date,
  expireAfterSeconds: Number
});

const LoginToken = mongoose.model('LoginToken', LoginTokenSchema);

module.exports = LoginToken;