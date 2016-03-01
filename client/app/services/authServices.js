angular.module('Evently.AuthServices', [])

.factory('Auth', function($http){
  // Make POST request to server to add user
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

  // Post request to log existing user in
  var loginUser = function(email, password){
    return $http({
      method: 'POST',
      url: '/api/login',
      data: {
        email: email,
        password: password
      }
    }).then(function(res){
      console.log('log in res:', res);
      return res.data;
    });

  };

  //TODO: logoutUser function

  return {
    addUser: addUser,
    loginUser: loginUser
  };

});