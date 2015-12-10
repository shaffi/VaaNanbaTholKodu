
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
exports.Support =function(req,res,next){
  jsonHelper.Support(req.body, function(supportUser){
    supportUser.save(function(err,Support){
      if(err)processError(err,req,res);
      res.send(new response(Support));
      console.log("Supported to us");
    });
  });
}
