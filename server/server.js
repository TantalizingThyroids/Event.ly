var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var weatherInfo = require('./wundergroundapi/wundergroundapi');
var router = require('./config/routes.js');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
router(app, express);

app.get('/api/',
	function(req, res) {
		// console.log(__dirname)
		// res.writeHead(200);
		res.sendFile(__dirname + '/index.html');
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

app.use(express.static(__dirname + '/../client'));

app.listen(8080);
console.log("Does this print?")

