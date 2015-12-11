//List of controllers
var joinusController = require('./controllers/joinusController');
var supportusController = require('./controllers/supportusController');

module.exports = function(app){
  app.post('/api/user', joinusController.createUserProfile);
  app.post('/api/supportus',supportusController.supportUS);
  app.post('/api/supportblood',supportusController.supportForBlood);
  app.post('/api/contactus', joinusController.contactUs);
}
