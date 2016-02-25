var db = require('../db/db.js');

/*Helper Functions*/
var insertValues = function(eventOwner, title, date, time, streetAddress, city, state, zipCode, latitude, longitude, indoorOutdoor, estimatedWeather, weatherStatus, publicPrivate, callback){

  var statement = db.prepare('INSERT INTO `eventTable`(`eventOwner`,`title`,`date`,`time`,`streetAddress`,`city`,`state`,`zipCode`,`latitude`,`longitude`,`indoorOutdoor`,`estimatedWeather`,`weatherStatus`,`publicPrivate`)'+ 'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
  statement.run(eventOwner, title, date, time, streetAddress, city, state, zipCode, latitude, longitude, indoorOutdoor, estimatedWeather, weatherStatus, publicPrivate, callback)
}

var createTable = function(callback){
  db.run('CREATE TABLE IF NOT EXISTS `eventTable`(' +
    '`eventID` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,' +
    '`eventOwner` TEXT,' +
    '`title` TEXT,' +
    '`date` TEXT,' +
    '`time` TEXT,' +
    '`streetAddress` TEXT,' +
    '`city` TEXT,' +
    '`state` TEXT,' +
    '`zipCode` INTEGER,' +
    '`latitude` REAL,' +
    '`longitude` REAL,' +
    '`indoorOutdoor` INTEGER,' +
    '`estimatedWeather` TEXT,' +
    '`weatherStatus` INTEGER,' +
    '`publicPrivate` INTEGER)', callback);
}

/*Exported Functions*/
module.exports.addOne = function(eventObj, callback){
  // if(!eventObj.hasOwnProperty('eventOwner') || !eventObj.hasOwnProperty('date') || !eventObj.hasOwnProperty('time') || !eventObj.hasOwnProperty('zipCode') || !eventObj.hasOwnProperty('title')) {
  //   return callback('Must complete required fields.');
  // }

}
module.exports.getAll = function(callback){
  // db.all('SELECT * from eventTable', callback);
}

module.exports.getByOwner = function(eventOwner, callback){
  // db.all('SELECT eventOwner from eventTable where eventOwner = ', callback)
}

module.exports.deleteEvent = function(eventId, callback){
  // db.run('DELETE eventID from eventTable where eventID = ', callback);

}

//-------------------------------------------------------------------------------------------//

/*Test for inserting in eventTable*/
// createTable(function (err){
//   if(err){
//     console.log("ERR!! ", err);
//   } else{
//     insertValues('Dan', 'Cricket Party', '2016-02-13', '10:00:00', '123 Main St.', 'SomeCity','CA', 12345, 123.445, 555.567, 1, 'rain', 0, 1, function(err){
//         if(err){
//           console.log('Error inserting values', err);
//         }
//     });
//   }
// })