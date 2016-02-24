var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var file = "evently.db";
var exists = fs.existsSync(file);

var db = new sqlite3.Database(file);

db.serialize(function(){
  if(!exists){
    db.run('CREATE TABLE Events (eventId INTEGER PRIMARY KEY AUTOINCREMENT, eventOwn VARCHAR, title VARCHAR, date DATE, time TIME, streetAddress VARCHAR, city VARCHAR, state VARCHAR, zip INTEGER, lat REAL, lon REAL, inOut INTEGER, estWx VARCHAR, wxSts VARCHAR, pubPriv INTEGER )');
  }
});

exports.db = db;