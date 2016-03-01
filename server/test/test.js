var db = require('../db/db.js')
db.useTestDatabase();
var mocha = require('mocha');
var expect = require('chai').expect;
var event = require('../model/event.js');
var fs = require('fs');

describe('event.js', function () {
  beforeEach(function(done){
    fs.unlink(__dirname +'/../db/testDatabase.db', function(err){
      if(err){
        console.log (err);
      }
      db.useTestDatabase();
      console.log("New Test Table!");
      done();
    })
  })

  it('should add event to eventTable', function (done) {
    /*Required Fields*/
    event.addOne({
      eventOwner: "Dog",
      title: "Hugs",
      date: '2016-03-02',
      time: '2:00:00',
      zipCode: 54321,
    }, function(err, data){
      if(err){
        console.error(err);
      } else{
        console.log(data);
      }
      done();
    });
  });

  it('should return all events from eventsTable', function (done) {

    event.getAll(function(err, data){
      if(err){
        console.error(err);
      } else{
        console.log(data);
      }
      done();
    });
  });

  xit('should return an event by eventOwner', function (done) {

    event.getByOwner(eventOwner, function(err, data){
      if(err){
        console.error(err);
      } else{
        console.log(data);
      }
      done();
    });
  });

  xit('should delete event by eventId', function (done) {

    event.deleteEvent(eventId, function(err, data){
      if(err){
        console.error(err);
      } else{
        console.log(data);
      }
      done();
    });
  });

});// end