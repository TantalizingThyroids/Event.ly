var db = require('../db/db.js');
var helpers = require('./helpers.js');
var eventController = require('../controllers/eventController.js');

module.exports = function (app, express) {
  /*Event Routes*/
  app.get('/api/event', eventController.getter);
  app.post('/api/event', eventController.addOneEvent);
  app.delete('/api/event/:id', eventController.deleteThisEvent);

  /*User Routes*/
  app.post('/api/signup', userController.addOneUser);
  app.post('/api/login', userController.addOneEvent);
  //TODO: logout functionality
  // app.delete('/api/logout', userController.logout);


  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
