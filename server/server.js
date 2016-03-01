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


app.use(express.static(__dirname + '/../client'));

router(app, express);

app.listen(process.env.PORT || 5000);
console.log("Listening on PORT 5000");

