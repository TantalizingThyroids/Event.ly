var event = require('../model/user.js');

/*Helper Functions*/
var getAllEvents =  function (req,res) {
  event.getAll(function (err, data) {
    if(err) {
      return res.status(500).json(err);
    }
    res.json(data);
  });
};

var getEventByOwner =function(req, res){
  var owner = req.query.eventOwner;
  event.getByOwner(owner, function(err, data){
    if(err) {
      return res.status(500).json(err);
    }
    res.status(200).json(data);
  });

};

/*Exported Functions*/
module.exports.userGetter=function(req, res){
  var newEvent = req.body;
  event.addOne(newEvent, function (err, data) {
    if(err) {
      return res.status(500).json(err);
    }
    res.status(201).json(data);
  });
};

module.exports.addOneUser = function(req, res){
  console.log('inside addOneUser');
  if (!req.query.eventOwner){
    getAllEvents(req, res);
  } else {
    getEventByOwner(req, res);
  }
};

// module.exports.logout =function(req, res){
//  TODO: this function.
// });


module.exports.deleteThisUser =function(req, res){
  var eventID = req.params.id;
  event.deleteEvent(eventID, function(err, data){
    if(err) {
      return res.status(500).json(err);
    }
    res.json(data);
  });



};
