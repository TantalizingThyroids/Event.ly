var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var weatherInfo = require('./wundergroundapi/wundergroundapi');
var router = require('./config/routes.js');
var app = express();
var path = require('path');

//routes set up in specific order
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
		res.sendFile(path.resolve(__dirname + '/../client/views/index.html'));
});

// app.post('/api/weather',
// 	function(req, res) {
// 		// var wx, location, weather;
// 		app.get('http://api.wunderground.com/api/70ba34089d4744a1/hourly10day/q/' + req.body.zipcode + '.json',
// 		  	function(parsed_json) {
// 			  var location = parsed_json['location']['city'];
// 			  var wx = parsed_json['current_observation']['temp_f'];
// 			  var test = console.log(wx);
// 			  	// req.body[weather] = wx;
// 			  		res.json(location, wx);

// 	  		});
// 	// db.addOne(req.body,
// 	// 	function() {
// 			res.json(location, wx);
// 	// })
// });

app.use(express.static(__dirname + '/../client'));

router(app, express);

app.listen(process.env.PORT || 5000);
console.log("Listening on PORT 5000");

