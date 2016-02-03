//modules
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var bodyParser = require("body-parser");

//models
var User = require('../models/user');
var jsonHelper = require("../helpers/json");
var response = require("../helpers/common").response;

//Join a user to the app
exports.createUserProfile = function(req, res, next){
  var imageType = req.body.imagetype;
  var imageUri = req.body.image;
  var mobile = req.body.mobile;

  User.find({"mobile": mobile}, function(err, user){
    if(user != null && user != ""){
        res.status(200).send(new response("User already exists with this mobile number"));
    }
    else {
      jsonHelper.getUserModel(req.body, function(newUser){
        newUser.save(function(err, user){
         if(err) return next(err);
          mobile = user.mobile;
          res.status(200).send(new response(user));
          if(typeof imageType != 'undefined'){
            updateImageToCloud(imageType, imageUri, mobile, function(){
            console.log("Profile image uploaded");
            return next();
            });
          }
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

exports.contactUs = function(req, res,next){
  var comments = req.body.comments;
  var id = req.body._id;
  User.findById(id,function(err, user){
  if(err) return next(err);
  user.comments = comments;
  user.save(function(err, user)
    {
      if(err)processError(err,req,res);
      console.log("contact us added");
      res.status(200).send("user comments are:"+ user.comments);
      return next();
    });
  });
}


exports.memberList = function(req, res, next){
   var inc = 0;
   var limit = req.body.limit;
   var start = req.body.start;

   User.list({ start: start , limit: limit , sort: 'name'},function(err,count,user){
     if(err) return next(err);
     user.forEach(function(){
       inc++;
     });
     if(limit <= count){
       if(inc != 0){
         res.status(200).send(JSON.stringify(user));
         return next();
       }
       else {
         res.status(200).send("No more user");
         return next();
       }
     }
     else {
       if(inc != 0){
         res.status(200).send(JSON.stringify(user));
         return next();
       }
       else {
         res.status(200).send("No more user");
         return next();
       }
     }
   });
 }


exports.userImage = function(req,res,next){
  var id = req.params.id;
  User.findById(id,function(err,user){
    if(err) return next(err);
    var img= user.image;
    res.status(200).send(new response(img));
    return next();
  });
}


exports.memberSearch = function(req,res,next){
  var  member = req.body.member;
  var charsearch = /[+-]/g;
  var result = member.match(charsearch);
  if(result != "" && result !=null)
  {
  User.find({"blood" : member},function(err,user){
    if(err) return next(err);
    res.status(200).send(JSON.stringify(user));
    return next();
  });
  }
else{
  User.find({"name" :member},function(err,user){
    if(err) return next(err);
    res.status(200).send(JSON.stringify(user));
    return next();
  });
}
}



exports.updateProfile = function(req, res, next){

 var name = req.body.name;
 var mobile = req.body.mobile;
 var emergency = req.body.emergency;
 var dob = req.body.dob;
 var email = req.body.email;
 var about = req.body.about;
 var proof = req.body.proof;
 var blood = req.body.blood;
 var know_friend = req.body.know_friend;
 var know_friendno = req.body.know_friendno;
 var know_social = req.body.know_social;
 var know_others = req.body.know_others;
 var address = req.body.address;
 var social_fb = req.body.social_fb;
 var social_twitter = req.body.social_twitter;
 var social_google = req.body.social_google;
 var comments = req.body.comments;
 var id = req.body._id;

 User.findById(id, function(err, user) {
 if(err) return next(err);
 user.name = name;
 user.mobile = mobile;
 user.comments = comments;
 user.emergency = emergency;
 user.dob = dob;
 user.email = email;
 user.about = about;
 user.proof = proof;
 user.blood = blood;
 user.know_friend = know_friend;
 user.know_friendno = know_friendno;
 user.know_social = know_social;
 user.know_others = know_others;
 user.address = address;
 user.social_fb = social_fb;
 user.social_twitter = social_twitter;
 user.social_google = social_google;
 user.comments = comments;

 user.save(function(err, user) {
  if(err) next(err);
    console.log(user);
    res.status(200).send(new response(user));
    return next();
  });
});
}


exports.updateImages = function(req,res,next){
  var id = req.body.id;
  var imageUri = req.body.image;
  var imageType = req.body.imagetype;
  User.findById(id, function(err, user){
    if(user != null && user != "")
    {
    console.log(user);
     cloudinary.uploader.upload("data:"+imageType+";base64,"+imageUri, function(result) {
       console.log(result.url);
       user.image = result.url;
       user.save(function(err, userdata){
         if(err) return next(err);
         res.status(200).send(new response(userdata.image));
         return next();
       });
     });
   }
   else {
       res.status(200).send("No user");
       return next();
   }
    });
   }


exports.viewProfile = function(req,res,next){
  var id = req.params.id;
  User.findById(id,function(err,user){
    if(err) return next(err);
    res.status(200).send(new response(user));
    return next();
  });
}
