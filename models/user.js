var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  mobile: {type: Number, required:true, unique: true},
  emergency: {type: Number, required:true},
  _password: {type: String, required: true},
  dob: String,
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
  social_fb: String,
  social_twitter: String,
  social_google: String,
  comments : String
}, { collection : 'user'});


mongoose.plugin(require('mongoose-list'));
var User = mongoose.model('user', userSchema);

module.exports = User;
