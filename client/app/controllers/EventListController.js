angular.module('Evently.List',[])
  .controller('EventListController', ['$scope', 'Events', function($scope, Events){
    $scope.data = {};
    // Get all events, for view
    Events.getAll()
    .then(function (data) {
      $scope.data.events = data;
    });
  }]);