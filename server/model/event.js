var db = require('../db/db.js').database();

/*Helper Functions for table creation*/
var insertValues = function(eventOwner, title, date, time, streetAddress, city, state, zipCode, latitude, longitude, indoorOutdoor, estimatedWeather, weatherStatus, publicPrivate, weatherIcon, lastUpdate, userTableID, callback){

  var statement = db.prepare('INSERT INTO `eventTable`(`eventOwner`,`title`,`date`,`time`,`streetAddress`,`city`,`state`,`zipCode`,`latitude`,`longitude`,`indoorOutdoor`,`estimatedWeather`,`weatherStatus`,`publicPrivate`,`weatherIcon`,`lastUpdate`,`userTableID`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
  statement.run(eventOwner, title, date, time, streetAddress, city, state, zipCode, latitude, longitude, indoorOutdoor, estimatedWeather, weatherStatus, publicPrivate, weatherIcon, lastUpdate, userTableID, callback);
};

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
    '`publicPrivate` INTEGER,' +
    '`weatherIcon` TEXT,'+
    '`lastUpdate` TEXT,'+
    '`userTableID` INTEGER,' +
    'FOREIGN KEY(userTableID) REFERENCES userTable(userID))', callback);
};

/*Exported Functions*/
module.exports.addOne = function(userID, eventObj, callback){
  if(userID === undefined) {
    throw 'userID must be present';
  }
  if(!eventObj.hasOwnProperty('eventOwner') || !eventObj.hasOwnProperty('date') || !eventObj.hasOwnProperty('time') || !eventObj.hasOwnProperty('zipCode') || !eventObj.hasOwnProperty('title')) {
    return callback('Must complete required fields.');
  }

  insertValues(
    eventObj.eventOwner, // required
    eventObj.title, // required
    eventObj.date, // required
    eventObj.time, // required
    eventObj.streetAddress,
    eventObj.city,
    eventObj.state,
    eventObj.zipCode, // required
    eventObj.latitude,
    eventObj.longitude,
    eventObj.indoorOutdoor || 1,
    eventObj.estimatedWeather,
    eventObj.weatherStatus || 0,
    eventObj.publicPrivate || 1,
    eventObj.weatherIcon,
    eventObj.lastUpdate,
    userID,
    callback);
};
// module.exports.getAll = function(callback){
//   db.all('SELECT * from eventTable', callback);
// };

module.exports.getByOwner = function(userID, callback){
  var lookUp = db.prepare('SELECT * from eventTable where userTableID = ?');
  console.log('Getting event: ',lookUp.all(userID, callback));
};

// TODO: fix bug for appropriate deletion
module.exports.deleteEvent = function(eventID, callback){
  var lookUp = db.prepare('DELETE from eventTable where eventID = ?');
  lookUp.run(eventID, callback);
};

// Update records weather info
module.exports.updateWx = function(data, eventID){
  console.log('Col, Data, EventID: ', typeof data, typeof eventID);
  db.run("UPDATE eventTable SET estimatedWeather = ? WHERE eventID = ?", data, eventID, function(err, result){
    if(err){
      console.log('You have an Error: ', err);
    } else {
      console.log('Data out: ', this);
    }
  });
};
// Update record time stamp
module.exports.updateStamp = function(data, eventID){
  console.log('Col, Data, EventID: ', typeof data, typeof eventID);
  db.run("UPDATE eventTable SET lastUpdate = ? WHERE eventID = ?", data, eventID, function(err, result){
    if(err){
      console.log('You have an Error: ', err);
    } else {
      console.log('Data out: ', this);
    }
  });
};


/*Test for inserting in eventTable*/
createTable(function (err){
  if(err){
    console.log("ERR!! ", err);
  }
});
