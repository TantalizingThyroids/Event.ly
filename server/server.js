// var path = require('path');
// var fs = require('fs');
var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var sqlite = require('sqlite3');
var bluebird = require('bluebird');
// var weatherInfo = require('./wundergroundapi/wundergroundapi');
// var db = require('../db/db.js');
// console.log(db);

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });   
// });

app.get('/api/', 
	function(req, res) {
		// console.log(__dirname)
		// res.writeHead(200);
		res.sendFile(__dirname + '/testindex.html');
});

app.get('/api/event', 
	function(req, res) {
		// res.json({ message: 'hooray! welcome to our api!' });   
		db.getAll(function(data) {
			res.send(data);
		})
});

app.post('/api/event', 
	function(req, res) {
		var wx, location, weather;
		app.get('http://api.wunderground.com/api/70ba34089d4744a1/hourly10day/q/' + req.body.zipcode + '.json', 
		  	function(parsed_json) {
			  var location = parsed_json['location']['city'];
			  var wx = parsed_json['current_observation']['temp_f'];
			  var test = console.log(wx)
			  	req.body[weather] = wx;
			  		res.send(test)

	  		})
	// db.addOne(req.body, 
	// 	function() {
			res.send("test")
	// })
});

app.delete('/api/event',
	function(req, res) {
	db.deleteEvent(req.body.eventId, function() {
	res.send("Event has been deleted!");
	})
});

app.get('/api/event',
	function(req, res) {
	db.getByOwner(req.body.eventOwner, function(data) {
	res.send(data)
	})
});

// app.get('/api/event', 
// 	function(req, res) {
//     function (err, data){
//       if(err) {
//       	throw err
//       } else {
//         res.writeHead(200);
//       }
//     };
//   } 
// });

// // app.get('/api/event', function(req, res) {
// //   if(req.method === "GET"){
// //       db.getAll(req.url, function(exist, data){
// //         if(!exist){
// //           res.writeHead(404);
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

app.use(express.static(__dirname + '/../client'));

app.listen(8080);
console.log("Does this print?")

