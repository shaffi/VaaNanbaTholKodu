var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  mobile: {type: Number, required:true, unique: true},
  altnum: {type: Number, required:true},
  _password: {type: String, required: true},
  date: String,
  month: String,
  Year: Number,
  email: {type: String, required: true},
  about: String,
  proof: String,
  blood: String,
  image: String,
  know_friend: String,
  know_friendno: Number,
  know_social: String,
  know_others: String,
  street: String,
  city: String,
  state: String,
  zipcode: Number,
  comments : String
}, { collection : 'user'});


mongoose.plugin(require('mongoose-list'));
var User = mongoose.model('user', userSchema);

module.exports = User;
