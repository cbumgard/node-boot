var mongoose = require('mongoose');

var User = exports.User = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
});