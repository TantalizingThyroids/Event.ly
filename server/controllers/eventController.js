// controller talks to the model
// intermediary for incoming req/res
var event = require('../model/event.js');

module.exports.getAllEvents =function(req, res){
  event.getAll(function (err, data) {
    if(err) {
      return res.status(500).json(err);
    }
    res.json(data);
  });
}

module.exports.addOneEvent =function(req, res){
  var newItem = req.body;
  event.addOne(newItem, function (err, data) {
    if(err) {
      return res.status(500).json(err);
    }
    res.status(201).json(data);
  });
}

module.exports.getEventByOwner =function(req, res){

}

module.exports.deleteThisEvent =function(req, res){

}
