angular.module('Evently.Delete',[])
  .controller('DeleteController', ['$scope','Events', function($scope, Events){
    // Delete record matching supplied ID
    $scope.deleteEvent = function () {
      Events.deleteEvent($scope.eventId);
    };
  }]);
