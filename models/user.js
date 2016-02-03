var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  mobile: {type: Number, required:true, unique: true},
  emergency: {type: Number, required:true},
  dob: String,
  email: String,
  about: String,
  proof: String,
  blood: String,
  image: String,
  know_friend: String,
  know_friendno: Number,
  know_social: String,
  know_others: String,
  address: String,
  social_fb: String,
  social_twitter: String,
  social_google: String,
  comments : String
}, { collection : 'user'});

var User = mongoose.model('user', userSchema);

module.exports = User;
