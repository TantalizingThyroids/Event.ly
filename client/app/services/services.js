angular.module('Evently.Services', [])
.factory('Events', function($http){
  // Get all scheduled events
  console.log('Inside Events');
  var getAll = function(){
    return $http({
      method: 'GET',
      url: '/event/',
    })
    .then(function(res){
      return res.data;
    });
  };

  var getOne = function(id){
    return $http({
      method: 'GET',
      url: '/event/'
    })
    .then(function(res){
      console.log('Get One res:', res);
      
    });
  };

  var newEvent = function(event){
    console.log('NewEvent : ', event);
    return $http({
      method: 'POST',
      url: '/event/',
      data: event
    })
    .then(function(res){
      console.log('New Event res:', res);
      
    });
  };

  // // Weather Info pull
  // var wx = function(zip){
  //   var request = '/api/70ba34089d4744a1/conditions/q/' + zip + '.json';
  //   return $http({
  //     method: 'GET',
  //     url: 'http://api.wunderground.com' + request
  //   })
  //   .then(function successCallback(res) {

  //     }, function errorCallback(res) {
  //       // called asynchronously if an error occurs
  //       console.log('Your weather call had an error', res);
  //     });
  // };

  return {
    getAll:getAll,
    getOne:getOne,
    newEvent:newEvent,
    // wx:wx
  };

});