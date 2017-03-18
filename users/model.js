const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
