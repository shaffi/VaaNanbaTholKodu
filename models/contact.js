var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
  name: String,
  mobile: Number,
  email: String,
  comments: String
}, {collection : 'contact'});

var Contact = require('contact', contactSchema);

module.exports = Contact;
