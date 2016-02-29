var user = require('../model/user.js');
var helper = require('../config/helpers.js');

/*Helper Functions*/
module.exports.addOneUser =function(req, res){
  var newUser = req.body;
  user.addUser(newUser, function (err, data) {
    if(err) {
      return res.status(500).json(err);
    }
    res.status(201).json(data);
  });
};

/*Exported Functions*/
module.exports.loginUser = function(req, res){
  //checks username & password
    user.loginUser(req.body.email, req.body.password, function(err, data){
      if(err){
        return res.status(500);
      } else {
        helper.encode(data);
      }
   });
};


// TODO: logout functionality
// module.exports.logoutUser =function(req, res){
// };
