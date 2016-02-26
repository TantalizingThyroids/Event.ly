angular.module('Evently.Add',[])
  .controller('EntryController', ['$scope', function($scope, Events){
    $scope.addEvent = function () {
      var newEvent= {
        eventOwn:$scope.addOwner,
        label:$scope.addLabel,
        time:$scope.addTime,
        date:$scope.addDate,
        street:$scope.addStreet,
        city:$scope.addCity,
        state:$scope.addState,
        zip:$scope.addZip,
        inOut:$scope.outside
      };
      Events.addEntry(newEvent);
    };
  }]);
