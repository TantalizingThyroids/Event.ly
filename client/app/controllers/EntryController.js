angular.module('Evently.Add',[])
  .controller('EntryController', ['$scope', function($scope, Events){
    $scope.addEvent = function () {
      var newEvent= {
        label:$scope.addLabel,
        time:$scope.addTime,
        date:$scope.addDate,
        zip:$scope.addZip,
        inOut:$scope.outside
      };
    Events.addEntry(newEvent);
  };

  }]);