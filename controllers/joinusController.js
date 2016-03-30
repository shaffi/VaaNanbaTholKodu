//modules
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var bodyParser = require("body-parser");
var path = require('path');

//models
var User = require('../models/user.js');
var jsonHelper = require("../helpers/json.js");
var response = require("../helpers/common.js").response;
var mail = require("../helpers/mail.js");

//Join a user to the app
exports.createUserProfile = function(req, res, next){
  debugger;
  var imageType = req.body.imagetype;
  var imageUri = req.body.image;
  var mobile = req.body.mobile;
  console.log("Adding user");

  User.find({"mobile": mobile}, function(err, user){
    if(user != null && user != ""){
        res.status(200).send(new response("User already exists with this mobile number"));
    }
    else {
      jsonHelper.getUserModel(req.body, function(newUser){
        console.log("new user" + newUser);
        newUser.save(function(err, user){
         if(err) return next(err);
          mobile = user.mobile;
          console.log("creating");
          res.status(200).send(new response(user));
          console.log("user added");
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

//contact a user to the app
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

//Listing the members present
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

//viewing the userimage
exports.userImage = function(req,res,next){
    var id = req.params.id;
    User.findById(id,function(err,user){
      if(err) return next(err);
      var img= user.image;
      res.status(200).send(new response(img));
      return next();
    });
}

//Searching the member based on name or bloodgroup
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


//updating a user profile
exports.updateProfile = function(req, res, next){
 var name = req.body.name;
 var mobile = req.body.mobile;
 var altnum = req.body.altnum;
 var _password = req.body._password;
 var dob = req.body.dob;
 var email = req.body.email;
 var about = req.body.about;
 var proof = req.body.proof;
 var blood = req.body.blood;
 var know_friend = req.body.know_friend;
 var know_friendno = req.body.know_friendno;
 var know_social = req.body.know_social;
 var know_others = req.body.know_others;
 var street = req.body.street;
 var city = req.body.city;
 var state = req.body.state;
 var zipcode = req.body.zipcode;
 var comments = req.body.comments;
 var id = req.body._id;

 User.findById(id, function(err, user) {
 if(err) return next(err);
 user.name = name;
 user.mobile = mobile;
 user.altnum = altnum;
 user._password = _password;
 user.dob = dob;
 user.email = email;
 user.about = about;
 user.proof = proof;
 user.blood = blood;
 user.know_friend = know_friend;
 user.know_friendno = know_friendno;
 user.know_social = know_social;
 user.know_others = know_others;
 user.street = street;
 user.city = city;
 user.state = state;
 user.zipcode = zipcode;
 user.comments = comments;

 user.save(function(err, user) {
  if(err) next(err);
    console.log(user);
    res.status(200).send(new response(user));
    return next();
  });
});
}

//user sign in
exports.signIn = function(req,res,next){
  var mobile = req.body.mobile;
  var _password = req.body._password;
  User.findOne({"mobile": mobile}, function(err, user) {
    if(user!= null && user!= "") {
       if(user._password== _password) {
          console.log(user._password);
          res.status(200).send("Sign in" +user);
          return next();
              }
        else {
                res.status(200).send("Invalid  password");
                return next();
             }
       }
      else {
        res.status(200).send("Invalid mobile number or password");
        return next();
      }
});
}
//Update user image
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

//Viewing the user profile
exports.viewProfile = function(req,res,next){
  var id = req.params.id;
  User.findById(id,function(err,user){
    if(err) return next(err);
    res.status(200).send(new response(user));
    return next();
  });
}


//Forgot password
exports.forgotPassword = function(req, res, next){
var email = req.params.email;
console.log(email)
User.findOne({'email':email}, function(err, user){
  if(err){
    res.status(400).send('Error looking up for email');
    return next();
  } else if(user) {
    mail.sendMail(user.email, 0, user.name, user._id, function(result){
        if(result == 1){
          res.status(400).send('Error sending mail');
          return next();
        } else {
        res.status(200).send('Mail Sent');
        return next();
      }
      });
  } else {
    res.status(400).send('No user found');
    return next();
  }
})

}

//sending the password file
exports.sendPasswordFile = function(req, res, next) {
  debugger;
 var id = req.params.id;
 var _password = req.body._password;
  console.log("Got id");
  var link = "http://vaananba.herokuapp.com/api/sendfile"+id;
  console.log("got link");
 User.findById(id,function(err,user){
   if(user != null && user != "" ){
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
   console.log("sent!!");
   }
  else {
    res.status(200).send("Sorry ,You are not an authorised user");
    return next();
  }
});
}

//Resetting Password
exports.changePassword = function(req,res,next){
 var id = req.body._id;
 var _password = req.body._password;
 User.findById(id,function(err, user){
 if(err) return next(err);
 user._password = _password;
 user.save(function(err, user)
   {
    if(err) throw err;
     console.log(user.name);
     res.status(200).send("Password Successfully resetted"+ user._password);
     console.log(user._password);
     return next();
   });
 });
}
//user log out
exports.logout = function(req,res,next){
  var id = req.params.id;
  User.findById(id,function(err,user){
    if(user!= null && user!= ""){
       res.status(200).send("Logged out Successfully");
       return next();
     }
     else {
       res.status(200).send("Invalid User");
       return next();
     }
  });
}
