//Node modules
var bodyParser = require("body-parser");
var express = require('express');
var path = require('path');
var cloudinary = require('cloudinary');
var config = require('./helpers/config');
var db = require('./helpers/db');
var routes = require('./routes');

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    cluster.fork();
  });

} else {
var app = express();
var port = Number(process.env.PORT) || '5451';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cloudinary configuration
cloudinary.config({cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});

//connect to the DB
var dbcon = process.env.MONGOLAB_URI || config.database.url;

db.connect(dbcon, config.database.options);

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send(new response('Data Something went wrong!'));
});

//starts and listen to the port
app.listen(port, function(){
  console.log("Server started in %d", port);
});

routes(app);

}
