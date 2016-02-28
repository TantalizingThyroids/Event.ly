var express = require('express');
var app = express();
var sqlite = require('sqlite3');
// var jquery = require(jquery); Commented to test server/db intergration

//http://api.wunderground.com/api/70ba34089d4744a1/forecast10day/q/94602.json

// module.exports = {
// 	var weather = function (zipcode) {
// 	  app.get('http://api.wunderground.com/api/70ba34089d4744a1/hourly10day/q/' + zipcode + '.json',
// 	  	function(parsed_json) {
// 		  var weatherObj = {};
// 		  	weather.location = parsed_json['location']['city'];
// 		    weather.temp_f = parsed_json['current_observation']['temp_f'];
//   		}
// 	  }
// }
