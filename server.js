//Node modules
var bodyParser = require("body-parser");
var express = require('express');
var path = require('path');
var cloudinary = require('cloudinary');
var config = require('./helpers/config');
var db = require('./helpers/db');
var routes = require('./routes');

var app = express();
var port = Number(process.env.PORT) || '5451';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cloudinary configuration
cloudinary.config({cloud_name: config.cloudinary.cloud_name, api_key: config.cloudinary.api_key, api_secret: config.cloudinary.api_secret });

//connect to the DB
db.connect(config.database.url, config.database.options);


//starts and listen to the port
app.listen(port, function(){
  console.log("Server started in %d", port);
});

routes(app);
