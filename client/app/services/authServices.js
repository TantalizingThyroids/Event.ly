angular.module('Evently.AuthServices', [])

.factory('Auth', function($http){

  console.log('Inside Auth heyheyhey!');
  var addUser = function(user){
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    })
    .then(function(res){
      console.log('New User res:', res);
      return res.data;
    });
  };

  return {
    addUser: addUser
  }

});