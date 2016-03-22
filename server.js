//Node modules
var bodyParser = require("body-parser");
var express = require('express');
var path = require('path');
var cloudinary = require('cloudinary');
var config = require('./helpers/config');
var db = require('./db.js');
var routes = require('./routes');
var response = require("./helpers/common").response;

var app = express();
//var port = Number(process.env.PORT) || '5451';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cloudinary configuration
 cloudinary.config({cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});

console.log("Starting up the server");
console.log("Connecting to MongoDB");

function start(cb) {
  cb = cb || function(err){
    if(err){
      throw err;
    }
  };
  var m = db.connect(function (err) {
    if (err) {
      throw err;
        console.log(err);
      process.exit(-1);
    }

    // Initialize the database
    db.init(function (err) {
      if (err) {
        console.log("Error initializing DB");
        process.exit(-1);
      }

      app.use(function(req,res,next){
        req.db = m;
        next();
      });
      require("./routes")(app);

      app.listen(process.env.PORT || 5451, function (err) {
        console.log(" Server listening ");
        cb(err);
      });
    });
  });
}
if (module.parent) {
  module.exports = exports = start;
} else {
  start();
}

module.exports.cleanup = function() {
    console.log("Worker PID#" + process.pid + " stop accepting new connections");
    app.close(function (err) {
      console.log("Worker PID#" + process.pid + " shutting down!!!");
      process.send({cmd: 'suicide'});
    });
}
