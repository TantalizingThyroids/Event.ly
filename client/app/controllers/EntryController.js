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
    $scope.setPristine(true);
  };

  }]);

  
// Event Owner
// Title
// Date
// Time
// Street address
// City
// State
// Zip code
// Latitude
// Longitude
// Indoor/Outdoor
// Estimated weather 
// Weather status
// Public/Private
