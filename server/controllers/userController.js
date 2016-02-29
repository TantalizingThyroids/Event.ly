var user = require('../model/user.js');

/*Helper Functions*/
var getAllUsers =  function (req,res) {
  user.getAll(function (err, data) {
    if(err) {
      return res.status(500).json(err);
    }
    res.json(data);
  });
};

module.exports.addOneUser =function(req, res){
  var newUser = req.body;
  user.addOne(newUser, function (err, data) {
    if(err) {
      return res.status(500).json(err);
    }
    res.status(201).json(data);
  });
};

/*Exported Functions*/
module.exports.userGetter = function(req, res){
  if (!req.query.userName){
    getAllUsers(req, res);
  } 
};

module.exports.deleteThisUser =function(req, res){
  var userID = req.params.id;
  user.deleteUser(userID, function(err, data){
    if(err) {
      return res.status(500).json(err);
    }
    res.json(data);
  });

};
