var db = require('../db/db.js');
var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {

  app.post('/api/events/addOne', db.addOne);
  app.get('/api/events/signup', db.getAll);
  app.get('/api/events/signedin', db.getByOwner);
  app.post('/api/events/signedin', db.deleteEvent);


  // authentication middleware used to decode token and made available on the request
  // app.use('/api/links', helpers.decode);


  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

