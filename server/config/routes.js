var db = require('../db/db.js');
var helpers = require('./helpers.js');
var eventController = require('../controllers/eventController.js');

module.exports = function (app, express) {
  // app.get('/api/'); is this needed?
  app.get('/api/event', eventController.getter);
  app.post('/api/event', eventController.addOneEvent);
  app.delete('/api/event/:id', eventController.deleteThisEvent);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
