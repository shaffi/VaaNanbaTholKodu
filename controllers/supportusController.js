
//modules
var mongoose =require('mongoose');
var cloudinary =require('cloudinary');
var bodyParser =require("body-parser");

//models
var User = require('../models/user');
var Support = require('../models/support');
var jsonHelper = require("../helpers/json");
var response = require("../helpers/common").response;
var processError = require("../helpers/common").error;

//support us to the app
exports.supportUS =function(req,res,next){
var mobile = req.body.mobile;
  Support.find({"mobile": mobile}, function(err, user){
    if(user != null && user != ""){
      res.send(new response("User already exist with this mobile number"));
    }
    else
    {
  jsonHelper.SupportModel(req.body, function(supportUser){
    supportUser.save(function(err,Support){
      if(err)processError(err,req,res);
      res.send(new response(Support));
      console.log("Supported to us");
    });
  });
}
});
}

exports.supportForBlood = function(req,res,next){
  var mobile = req.body.mobile;
  Support.find({"mobile": mobile}, function(err, user){
    if(user != null && user !=""){
      res.send(new response("User already exist with this mobile number"));
    }
  else
    {

  jsonHelper.SupportModel(req.body ,function(supportUser){
    supportUser.save(function(err,Support){
      if(err)processError(err,req,res);
      res.send(new response(Support));
      console.log("Supported  for blood");
    });
  });
}
});
}
