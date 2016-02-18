var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var db = new sqlite3.Database('db'); //which folder to initialize from?

var insertValues = function(eventID, eventOwner, title, date, time, streetAddress, city, state, zipCode, latitude, longitude, indoorOutdoor, estimatedWeather, weatherStatus, publicPrivate, callback){

  var statement = db.prepare('INSERT INTO `eventTable`(`eventID`,`eventOwner`,`title`,`date`,`time`,`streetAddress`,`city`,`state`,`zipCode`,`latitude`,`longiude`,`indoorOutdoor`,`estimatedWeather`,`weatherStatus`,`publicPrivate`)'+ 'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
  statement.run(eventID, eventOwner, title, date, time, streeAddress, city, state, zipCode, latitude, longitude, indoorOutdoor, estimatedWeather, weatherStatus, publicPrivate, callback)
}

var createTable = function(callback){
  db.run('CREATE TABLE IF NOT EXISTS `eventTable`(' +
    '`eventID` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,' +
    '`eventOwner` TEXT,' +
    '`title` TEXT,' +
    '`date` DATE,' +
    '`time` TIME,' +
    '`streetAddress` TEXT,' +
    '`city` TEXT,' +
    '`state` TEXT,' +
    '`zipCode` INTEGER,' +
    '`latitude` REAL,' +
    '`longitude` REAL,' +
    '`indoorOutdoor` INTEGER,' +
    '`estimatedWeather` INTEGER,' +
    '`weatherStatus` INTEGER,' +
    '`publicPrivate` INTEGER'
    ')', callback);
}

var getAll = function(){
  db.all('SELECT * from eventTable', callback);
}

createTable(function (err){
  if(err){
    console.error(err);
  } else{
    insertValues('Dan', 'Cricket Party', '2016-02-13', '10:00:00', '123 Main St.', 'SomeCity','CA', 12345, 123.445, 555.567, 1, 0, 1, function(err){
        if(err){
          console.log('Error inserting values', err);
        }
    });
  }
})