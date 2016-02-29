angular.module('Evently.AuthServices', [])

.factory('Auth', function($http, $q){
  var addUser = function(user){
   //---Test for redirect---//
    return $q(function(resolve, reject) {
      resolve({awef: "a@b.com"});
    });
   //----------------------//
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

  }

  return {
    addUser: addUser,
    loginUser: loginUser
  }

});