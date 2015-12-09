//List of controllers
var joinusController = require('./controllers/joinusController');
var support = require('./controllers/supportusController');

module.exports = function(app){
  app.post('/api/user', joinusController.createUserProfile);
  app.post('/api/upload', joinusController.uploadimage);
}
