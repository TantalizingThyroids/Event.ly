var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var sqlite = require('sqlite3');
var bluebird = require('bluebird');
var weatherInfo = require('./wundergroundapi/wundergroundapi');
var db = require('../db/db.js');


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
		res.sendFile(__dirname + '/index.html');
});

app.post('/api/event', function(req, res) {
  var newEvent = req.body;
  console.log("newEvent", newEvent);
  db.create(newEvent, function (err, data) {
    if(err) {
      return res.status(500).json(err);
    }
    res.status(201).json(data);
  });
});

app.get('/api/event', 
  function(req, res) {
    db.getAll(function (err, data) {
      if(err) {
        return res.status(500).json(err);
      }
      res.json(data);
    });
  });

app.post('/api/weather', 
	function(req, res) {
		// var wx, location, weather;
		app.get('http://api.wunderground.com/api/70ba34089d4744a1/hourly10day/q/' + req.body.zipcode + '.json', 
		  	function(parsed_json) {
			  var location = parsed_json['location']['city'];
			  var wx = parsed_json['current_observation']['temp_f'];
			  var test = console.log(wx)
			  	// req.body[weather] = wx;
			  		res.json(location, wx);

	  		})
	// db.addOne(req.body, 
	// 	function() {
			res.json(location, wx);
	// })
});

app.delete('/api/event:id',
function(req, res) {
  console.log("req.body is: ", req.body)
  console.log("req.params.id is: ", req.params.id)
  // var deletedItem = req.body;
  var eventId = req.params.id;
  db.deleteEvent(eventId, function (err, data) {
    if(err) {
      return res.status(500).json(err);
    } else {
      console.log('eventId is: ', eventId);
      res.json(data);
    }
  });
});

app.get('/api/event:id',
function(req, res) {
  console.log("req.body is: ", req.body)
  console.log("req.params.id is: ", req.params.id)
  var eventId = req.params.id;
  db.getByOwner(eventId, function (err, data) {
    if(err) {
      return res.status(500).json(err);
    } else {
      console.log('eventId is: ', eventId);
      res.json(data);
    }
  });
});

app.use(express.static(__dirname + '/../client'));

app.listen(8080);
console.log("Does this print?")

