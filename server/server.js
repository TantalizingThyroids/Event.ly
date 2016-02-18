var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
// var sqlite = require('sqlite3');
// var db = require('../db/db.js');
// console.log(db);

var app = express();
app.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use(express.static(__dirname + '/../client'));

app.listen(8080);
console.log("Does this print?")

// 