var db = require('../db/db.js');
var helpers = require('./helpers.js'); 

module.exports = function (app, express) {
  app.get('/api/');
  app.get('/api/event', db.getAll);
  app.post('/api/event', db.addOne);
  app.get('api/event/:id', db.getByOwner);
  app.delete('/api/event:id', db.deleteEvent);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
