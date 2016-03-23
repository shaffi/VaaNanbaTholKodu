var mongoose = require('mongoose');
var User = require('../models/user');
var Support = require('../models/support');

module.exports.getUserModel = function(data, callback){
  var newUser = new User ({
    name: data.name,
    mobile: data.mobile,
    altnum: data.altnum,
    _password: data._password,
    date: data.date,
    month: data.month,
    year: data.year,
    email: data.email,
    about: data.about,
    proof: data.proof,
    blood: data.blood,
    street: data.street,
    city: data.city,
    state: data.state,
    zipcode: data.zipcode,
    know_friend: data.know_friend,
    know_friendno: data.know_friendno,
    know_social: data.know_social,
    know_others: data.know_others,
    comments : data.comments
  });
  callback(newUser);
}


module.exports.SupportModel = function(data, callback){
  var supportUser =new Support({
    name: data.name,
    mobile: data.mobile,
    day: data.day,
    month: data.month,
    time_from: data.time_from,
    time_to: data.time_to,
    street: data.street,
    city: data.city,
    state:  data.state,
    zipcode: data.zipcode,
    type: data.type
    });
    callback(supportUser);
}
