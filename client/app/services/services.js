angular.module('Evently.Services', [])
.factory('Events', function($http, $window){
  // Get all scheduled events
  console.log('Inside Events');
  var getAll = function(){
    return $http({
      method: 'GET',
      url: '/api/event/',
      headers: {
        Authorization: function(){
          return $window.localStorage['token'];
        }
      }
    })
    .then(function(res){
      return res.data;
    });
  };
  // Get individual event by event id, NOT IMPLIMENTED YET
  var getOne = function(id){
    return $http({
      method: 'GET',
      url: '/api/event/',
      headers: {
        Authorization: function(){
          return $window.localStorage['token'];
        }
      }
    })
    .then(function(res){
      console.log('Get One res:', res);
      return res.data;
    });
  };
  // POST request to add entry to database
  var addEntry = function(event){
    console.log('NewEvent : ', event);
    return $http({
      method: 'POST',
      url: '/api/event/',
      data: event,
      headers: {
        Authorization: function(){
          return $window.localStorage['token'];
        }
      }
    })
    .then(function(res){
      window.alert("Event successfully created!");
      return res.data;
    });
  };
  // remove event from database
  var deleteEvent = function(id){
    console.log('DeleteEvent: ', id);
    return $http({
      method: 'DELETE',
      url: '/api/event/'+ id,
      headers: {
        Authorization: function(){
          return $window.localStorage['token'];
        }
      }
    })
      .then(function(res){
        return res.data;
      });
  };

  // Weather Info pull from Wunderground API
  var wx = function(zip, callback){
    var request = '/api/70ba34089d4744a1/forecast10day/q/' + zip + '.json';
    return $http({
      method: 'GET',
      url: 'https://api.wunderground.com' + request
    })
    .then(function successCallback(res) {
      callback(res.data);
      }, function errorCallback(res) {
        // called asynchronously if an error occurs
        console.log('Your weather call had an error', res);
      });
  };

  return {
    getAll:getAll,
    getOne:getOne,
    addEntry:addEntry,
    deleteEvent:deleteEvent,
    wx:wx
  };

});