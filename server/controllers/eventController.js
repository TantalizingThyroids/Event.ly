var event = require('../model/event.js');

/*Exported Functions*/
module.exports.addOneEvent =function(req, res){
  console.log("USER ID", req.user.id);
  var newEvent = req.body;
  event.addOne(req.user.id, newEvent, function (err, data) {
    if(err) {
      return res.status(500).json(err);
    }
    res.status(201).json(data);
  });
};

module.exports.getEventByOwner =function(req, res){
  event.getByOwner(req.user.id, function(err, data){
    if(err) {
      return res.status(500).json(err);
    }
    res.status(200).json(data);
  });
};

module.exports.deleteThisEvent =function(req, res){
  var eventID = req.params.id;
  event.deleteEvent(eventID, function(err, data){
    if(err) {
      return res.status(500).json(err);
    }
    res.json(data);
  });
};
