var db = require('../db/db.js').database();

/*Helper Functions*/
var insertUserValues = function(email, password, callback){

  var statement = db.prepare('INSERT INTO `userTable`(`email`, `password`) VALUES (?,?)');
  statement.run(email, password, function(err) {
    if(err) {
      return callback(err);
    }
    db.get('SELECT userID, email FROM `userTable` WHERE userID = ?', this.lastID, callback);
  })
}

var createUserTable = function(callback){
  db.run('CREATE TABLE IF NOT EXISTS `userTable`(' +
    '`userID` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,' +
    '`email` TEXT,' +
    '`password` TEXT)', callback);
};

/*Exported Functions*/
module.exports.addUser = function(eventObj, callback){
  if(!eventObj.hasOwnProperty('email') || !eventObj.hasOwnProperty('password')) {
    return callback('Must complete required fields.');
  }

  insertUserValues(
    eventObj.email, // required
    eventObj.password, // required
    callback);
};

module.exports.loginUser = function(email, password, callback){
  db.get('SELECT * from userTable WHERE email = ? AND password = ?', email, password, function(err, data){
      if(err){
        callback(err, null);
      } else {
        console.log('login data', data);
        if(data === undefined || data.length === 0){
          callback("User not found.", null)
        }else{
          callback(null, data);
        }
      }
  });
};

module.exports.deleteUser = function(userID, callback){
  var lookUp = db.prepare('DELETE from userTable WHERE userID = ?');
  lookUp.run(userID, callback);
};

/*Test creating userTable*/
createUserTable(function (err){
  if(err){
    console.log("ERR!! ", err);
  }
});
