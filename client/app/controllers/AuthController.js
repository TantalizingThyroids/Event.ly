angular.module('Evently.Auth',[])
  .controller('AuthController', ['$scope','$location', '$window','Auth', function($scope, $location, $window, Auth){
    $scope.newSignUp = {
      email: null,
      password: null
    }

    $scope.addUser = function () {
      Auth.addUser($scope.newSignUp).then(function(){
        $location.path('/');
      }).catch(function(err){
        window.alert("Sorry!");
      });
    };

    $scope.loginUser = function(){
      Auth.loginUser().then(function(data){
        $window.localStorage['token'] = data.token;
        $location.path('/');
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
