var db = require('../db/db.js');
var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {
  app.get('/api/');
  app.get('/api/event', db.getAll);
  app.post('/api/event', db.addOne);
  app.get('api/event/:id', db.getByOwner);
  app.delete('/api/event', db.deleteEvent);


//=========================================

// app.get('/api/', function(req, res) {
//   if(req.method === "GET") {
//     function(err, data){
//       if(err) throw err;
//         res.writeHead(200);
//         res.end(data);
//       };
//   } 
// });

// app.get('/api/event', function(req, res) {
//   if(req.method === "GET"){
//       db.getAll(req.url, function(exist, data){
//         if(!exist){
//           res.writeHead(404);
//           res.end();
//         } else {
//           res.writeHead(200);
//           res.end(data);
//         }
//       });
//     }

// app.post('/api/', function(req, res) {
  // var body = '';
  //   req.on('data', function(data){
  //     body += data;
  // });
//   db.addOne(body, function() {});
//     res.writeHead(302);
//     function(err, data){
//       if(err) throw err;
//       res.end(data);
//   };
// })

// app.post('/api/', function(req, res) {
  // var body = '';
  //   req.on('data', function(data){
  //     body += data;
  // });
//   db.deleteOne(body, function() {});
//     res.writeHead(302);
//     function(err, data){
//       if(err) throw err;
//       res.end(data);
//   };
// })

//=========================================

  // authentication middleware used to decode token and made available on the request
  // app.use('/api/links', helpers.decode);


  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
