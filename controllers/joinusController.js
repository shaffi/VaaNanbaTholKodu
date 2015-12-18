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
         console.log(user);
          mobile = user.mobile;
          res.send(new response(user));
          if(typeof imageType != 'undefined'){
            updateImageToCloud(imageType, imageUri, mobile, function(){
            console.log("Profile image uploaded");
            });
          }
        });
      });
    }
  });
}

function updateImageToCloud(type, uri,  mobile, callback){
  console.log(type + " " + uri + " " + mobile);
  cloudinary.uploader.upload("data:"+type+";base64,"+uri, function(result) {
    User.findOne({"mobile": mobile}, function(err, user){
      console.log(result.url);
      user.image = result.url;
      console.log(user.image);
      user.save(function(err, user){
        callback();
      });
    });
  });
}

exports.contactUs = function(req, res){
  var comments = req.body.comments;
  var id = req.body._id;
  console.log(comments + " sd" + id);
  User.findById(id,function(err, user){
  if(err)processError(err,req,res);
  user.comments = comments;
  console.log(user);
  user.save(function(err, user)
    {
      if(err)processError(err,req,res);
      console.log("contact us");
      res.send("user comments are:"+ user.comments);
    });
  });
}


exports.memberList = function(req, res, next){
  var inc = 0;
  var limit = req.body.limit;
  var start = req.body.start;
  User.list({ start: start , limit: limit , sort: 'name'},function(err,count,user){
    if(err) throw err;
    user.forEach(function(){
      inc++;
    });
    console.log(inc);
    if(limit <= count){
      if(inc != 0){
        res.send(JSON.stringify(user));
      }
      else {
        res.send("No more user");
      }
    }
    else {
      if(inc != 0){
        res.send(JSON.stringify(user));
      }
      else {
        res.send("No more user");
      }
    }
  });
}


exports.userImage = function(req,res){
//  var imageType = req.body.imagetype;
  //var imageuri = req.body.image;
  var id = req.body._id;
  User.findById(id,function(err,user){
    console.log(user);
    if(err) processError (err,req,res);
    var img= user.image;
    console.log("image is:" + user.image);
    //cloudinary.api.resources(function(user){
   //res.send({ images: user.resources});
 //});
    res.send(new response(img));
  });
}
