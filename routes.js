//List of controllers
var joinusController = require('./controllers/joinusController');
var supportusController = require('./controllers/supportusController');

module.exports = function(app){
  app.post('/api/user', joinusController.createUserProfile);
  app.post('/api/supportus',supportusController.supportUS);
  app.post('/api/materialsupport',supportusController.materialSupport);
  app.post('/api/contactus', joinusController.contactUs);
  app.post('/api/memberlist', joinusController.memberList);
  app.post('/api/supportermemberlist',supportusController.supporterMemberList);
  app.get('/api/userimage/:id',joinusController.userImage);
  app.post('/api/membersearch',joinusController.memberSearch);
  app.post('/api/updateimages',joinusController.updateImages);
  app.post('/api/updateprofile',joinusController.updateProfile);
  app.get('/api/viewprofile/:id',joinusController.viewProfile);
  app.post('/api/signin',joinusController.signIn);
  app.post('/api/forgotpassword/:email',joinusController.forgotPassword);
  app.post('/api/logout/:id',joinusController.logout);
  app.get('/api/sendfile/:id',joinusController.sendPasswordFile);
  app.post('/api/changepassword',joinusController.changePassword);
}
