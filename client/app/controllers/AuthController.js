angular.module('Evently.Auth',[])
  .controller('AuthController', ['$scope','$location', '$window','Auth', function($scope, $location, $window, Auth){

    $scope.newSignUp = {
      email: null,
      password: null
    }

    $scope.addUser = function () {
      Auth.addUser($scope.newSignUp).then(function(data){
        $window.localStorage['token'] = data.token;
        $location.path('/newEvent');
      }).catch(function(err){
        window.alert("Sorry!");
      });
    };

    $scope.login = {
      email: null,
      password: null
    }

    //TODO: bug fix for addUser if email already exists
    $scope.loginUser = function(){
      Auth.loginUser($scope.login.email, $scope.login.password).then(function(data){
        $window.localStorage['token'] = data.token;
        $location.path('/newEvent');
      }).catch(function(){
        window.alert("Unsuccessful login.");
      })
    }

    $scope.logOutUser = function(){
      Auth.logOutUser().then(function(){
        $window.localStorage.removeItem('token');
        $location.path('/login');
      }).catch(function(){
        console.log(err);
      })
    }

}]);
