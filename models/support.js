var mongoose = require('mongoose');

var supportSchema = new mongoose.Schema({
  name: String,
  mobile: Number,
  day: String,
  month: String,
  time_from: String,
  time_to: String,
  street: String,
  city: String,
  state: String,
  zipcode: Number,
  type: String
}, { collection: 'support'});

mongoose.plugin(require('mongoose-list'));
var Support = mongoose.model('support', supportSchema);

module.exports = Support;
