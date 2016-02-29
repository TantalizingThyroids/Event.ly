var db = require('../db/db.js').database();
//TODO: bcrypt for password

/*Helper Functions*/
var insertUserValues = function(email, password, callback){

  var statement = db.prepare('INSERT INTO `userTable`(`email`, `password`) VALUES (?,?)');
  statement.run(email, password, callback)
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
    eventObj.password,
    callback);
};

module.exports.loginUser = function(email, password, callback){
  db.all('SELECT * from userTable WHERE email = ? AND password = ? LIMIT 1', email, password, function(err, data){
      if(err){
        callback(err, null);
      } else {
        if(data === undefined){
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

/*Test for inserting in eventTable*/
createUserTable(function (err){
  if(err){
    console.log("ERR!! ", err);
  } else {
    insertUserValues("Unicorn@ab.com", "groot", function(err, data){
      if(err){
        console.log("ERR", err)
      } else {
        console.log("DATA", data);
      }
    })
  }
});
