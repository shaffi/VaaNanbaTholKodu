//modules
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var bodyParser = require("body-parser");

//models
var User = require('../models/user');
var jsonHelper = require("../helpers/json");
var response = require("../helpers/common").response;
var processError = require('../helpers/common').error;

//Join a user to the app
exports.createUserProfile = function(req, res, next){
  var imageType = req.body.imagetype;
  var imageUri = req.body.image;
  var mobile = req.body.mobile;
  User.find({"mobile": mobile}, function(err, user){
    if(user != null && user != ""){
        res.send(new response("User already exists with this mobile number"));
    }
    else {
      jsonHelper.getUserModel(req.body, function(newUser){
        newUser.save(function(err, user){
          if(err) processError(err, req, res);
          mobile = user.mobile;
          res.send(new response(user));
          updateImageToCloud(imageType, imageUri, mobile, function(){
            console.log("Profile image uploaded");
          });
        });
      });
    }
  });
}

function updateImageToCloud(type, uri,  mobile, callback){
  cloudinary.uploader.upload("data:"+type+";base64,"+uri, function(result) {
    User.findOne({"mobile": mobile}, function(err, user){
      user.image = result.url;
      user.save(function(err, user){
        callback();
      });
    });
  });
}
