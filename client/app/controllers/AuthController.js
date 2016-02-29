angular.module('Evently.Auth',[])
  .controller('AuthController', ['$scope','Auth', function($scope, Auth){
    $scope.newSignUp = {
      email: null,
      password: null
    }
    $scope.addUser = function () {
      Auth.addUser($scope.newSignUp);
    };
}]);
