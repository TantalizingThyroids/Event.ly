angular.module('Evently.Delete',[])
  .controller('DeleteController', ['$scope', function($scope, Events){
    $scope.deleteEvent = function () {

      Events.deleteEvent($scope.eventId);
    };
  }]);
