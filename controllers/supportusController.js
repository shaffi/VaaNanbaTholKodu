
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
    console.log(user);
    if(user != null && user != ""){
      res.send(new response("User already exist with this mobile number"));
    }
    else
    {
  jsonHelper.SupportModel(req.body, function(supportUser){
    supportUser.save(function(err,Support){
      if(err)processError(err,req,res);
      console.log(Support);
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


exports.supporterMemberList =function(req,res,next){
 var inc = 0;
 var start = req.body.start;
 var limit = req.body.limit;
  Support.list({start :start ,limit :limit ,sort:'name'},function(err,count,user){
      if(err) throw err;
      //user.image = image;
      console.log(user);
      user.forEach(function(){
          inc++;
      });
        console.log(inc);
        if(limit<=count){
          if(inc!=0){
            res.send(JSON.stringify(user));
          }
          else{
            res.send("No more user");
          }
        }
        else{
          if(inc!=0){
            res.send(JSON.stringify(user));
          }
          else{
            res.send("No more user");
          }
        }
  });
}
