var mongoose = require('mongoose');
var User = require('../models/user');

module.exports.getUserModel = function(data, callback){
  var newUser = new User ({
    name: data.name,
    mobile: data.mobile,
    emergency: data.emergency,
    dob: data.dob,
    email: data.email,
    about: data.about,
    proof: data.proof,
    blood: data.blood,
    address: data.address,
    know_friend: data.know_friend,
    know_friendno: data.know_friendno,
    know_social: data.know_social,
    know_others: data.know_others,
    social_fb: data.social_fb,
    social_twitter: data.social_twitter,
    social_google: data.social_google
  });
  callback(newUser);
}
