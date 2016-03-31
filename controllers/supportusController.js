
//modules
var mongoose =require('mongoose');
var cloudinary =require('cloudinary');
var bodyParser =require('body-parser');
var path = require('path');

//models
var User = require('../models/user');
var Support = require('../models/support');
var jsonHelper = require("../helpers/json");
var response = require("../helpers/common").response;

//support us to the app
exports.supportUS =function(req,res,next){
var mobile = req.body.mobile;
  Support.find({"mobile": mobile}, function(err, user){
    if(user != null && user != ""){
      console.log("user exists");
      res.status(200).send(new response("User already exist with this mobile number"));
      return next();
    }
    else
    {
  jsonHelper.SupportModel(req.body, function(supportUser){
    supportUser.save(function(err,Support){
      if(err) return next(err);
      res.status(200).send(new response(Support));
      console.log("Supported to us");
      return next();
    });
  });
}
});
}

//material support
exports.materialSupport = function(req,res,next){
  var mobile = req.body.mobile;
  Support.find({"mobile": mobile}, function(err, user){
    if(user != null && user !=""){
      res.status(200).send(new response("User already exist with this mobile number"));
      return next();
    }
  else
    {

  jsonHelper.SupportModel(req.body ,function(supportUser){
    supportUser.save(function(err,Support){
      if(err) return next(err);
      res.status(200).send(new response(Support));
      console.log("Supported  for material");
      return next();
    });
  });
}
});
}


exports.supporterMemberList =function(req,res,next){
 var inc = 0;
 var start = req.body.start;
 var limit = req.body.limit;
 console.log(start + limit);
  Support.list({start :start ,limit :limit ,sort:'name'},function(err,count,user){
      if(err) return next(err);
      user.forEach(function(){
          inc++;
      });
        if(limit<=count){
          if(inc!=0){
            console.log("listed")''
            res.status(200).send(JSON.stringify(user));
            return next();
          }
          else{
            console.log("no user");
            res.status(200).send("No more user");
            return next();
          }
        }
        else{
          if(inc!=0){
            console.log("listed");
            res.status(200).send(JSON.stringify(user));
            return next();
          }
          else{
            console.log("no user");
            res.status(200).send("No more user");
            return next();
          }
        }
  });
}
