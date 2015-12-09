//modules
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var bodyParser = require("body-parser");

//models
var User = require('../models/user');
var jsonHelper = require("../helpers/json");
var response = require("../helpers/common").response;
var processError = require('../helpers/common').error;

exports.uploadimage = function(req,res){
  //var data = req.body.imageurl;
  var imageStream = fs.createReadStream(req.files.image.path, { encoding: 'binary' }),
  cloudStream = cloudinary.uploader.upload_stream(function() {
    res.send('success');
  });
  imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
  //cloudinary.uploader.upload(req.body, function(result) {
    //console.log(result);
    //res.send(""+result.url);
  //});
}

exports.createUserProfile = function(req, res, next){
  jsonHelper.getUserModel(req.body, function(newUser){
    User.find({"mobile": newUser.mobile}, function(err, user){
      if(err) processError(err, req, res);
      if(user != null && user != ""){
          res.send(new response("User already exists with this mobile number"));
      }
      else {
        newUser.save(function(err, user){
          if(err) processError(err, req, res);
          res.send(new response(user));
        });
      }
    });
  });
}
