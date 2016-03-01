var user = require('../model/user.js');
var helper = require('../config/helpers.js');

/*Helper Functions*/
module.exports.addOneUser =function(req, res){
  var newUser = req.body;
  user.addUser(newUser, function (err, data) {
    if(err) {
      return res.status(500).json(err);
    }
    var token = helper.encode(data);
    res.status(201).json({token: token});
  });
};

/*Exported Functions*/
module.exports.loginUser = function(req, res){
    user.loginUser(req.body.email, req.body.password, function(err, data){
      if(err){
        return res.status(500).json(err);
      } else {
        var token = helper.encode(data);
        res.status(200).json({token: token});
      }
   });
};


// TODO: logout functionality
// module.exports.logoutUser =function(req, res){
// };
