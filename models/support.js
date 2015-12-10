var mongoose = require("mongoose");

var supportSchema = new mongoose.Schema({
  name: String,
  mobile: Number,
  altnum: Number,
  blood: String,
  time_from: String,
  time_to: String,
  address: String,
  type: String
}, { collection: 'support'});

var Support = mongoose.model('support', supportSchema);

module.exports = Support;
 
