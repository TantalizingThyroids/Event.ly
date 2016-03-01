var db = require('../db/db.js');
var helpers = require('./helpers.js');
var eventController = require('../controllers/eventController.js');
var userController = require('../controllers/userController.js');

module.exports = function (app, express) {
  /*User Routes*/
  app.post('/api/signup', userController.addOneUser);
  app.post('/api/login', userController.loginUser);
  //TODO: logout functionality

  /*Event Routes*/
  //decode activated on user login/signup
  app.use(helpers.decode);
  app.get('/api/event', eventController.getEventByOwner);
  app.post('/api/event', eventController.addOneEvent);
  app.delete('/api/event/:id', eventController.deleteThisEvent);


  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
