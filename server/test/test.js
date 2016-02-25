var mocha = require('mocha');
var expect = require('chai').expect;
var event = require('../model/event.js');

describe('event.js', function () {
  it('should add event to eventTable', function () {
    /*Required Fields*/

    event.addOne({
      eventOwner: "Not Dan",
      title: "Catepillar Party",
      date: '2016-03-02',
      time: '2:00:00',
      zipCode: 54321,
    }, function(err, data){
      if(err){
        console.error(err);
      } else{
        console.log(data);
      }
    });
  });

  it('should return all events from eventsTable', function () {

    event.getAll(function(err, data){
      if(err){
        console.error(err);
      } else{
        console.log(data);
      }
    });
  });

  it('should return an event by eventOwner', function () {

    event.getByOwner(eventOwner, function(err, data){
      if(err){
        console.error(err);
      } else{
        console.log(data);
      }
    });
  });

  it('should delete event by eventId', function () {

    event.deleteEvent(eventId, function(err, data){
      if(err){
        console.error(err);
      } else{
        console.log(data);
      }
    });
  });

});// end