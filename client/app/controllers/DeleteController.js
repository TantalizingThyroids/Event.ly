angular.module('Evently.Delete',[])
  .controller('DeleteController', ['$scope','Events', function($scope, Events){
    $scope.deleteEvent = function () {

      Events.deleteEvent($scope.eventId);
    };
  }]);
