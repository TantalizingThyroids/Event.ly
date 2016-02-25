var sqlite3 = require('sqlite3').verbose();

/*Live database*/
var db = new sqlite3.Database(__dirname + '/database.db');

/*Testing database*/
module.exports.useTestDatabase = function(){
  var path = __dirname + '/testDatabase.db'
  db = new sqlite3.Database(__dirname + '/testDatabase.db');
  console.log("PATH", path);
}

/*Test or Live depending on caller*/
module.exports.database = function(){
  return db;
};
