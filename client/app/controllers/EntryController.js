angular.module('Evently.Add',[])
  .controller('EntryController', ['$scope','Events', function($scope, Events){
    // var wxObj = Events.wx($scope.addZip);

    $scope.addEvent = function () {
      // Function to get current Day of Year
      // For comparison against Weather API days
      Date.prototype.getDOY = function() {
        var onejan = new Date(this.getFullYear(),0,1);
        return Math.ceil((this - onejan) / 86400000);
      };
      var wxSts = 0;
      var today = new Date();
      var targetDay = $scope.addDate;
      var todayNum = today.getDOY();
      var targetNum = targetDay.getDOY();
      var daysOut = targetNum - todayNum;
      if(daysOut < 9){
        Events.wx($scope.addZip, function(res){
          // console.log('Returned Wx Object 10Day Hourly: ', res);
          console.log('Returned Wx object: ', res.forecast.simpleforecast.forecastday[daysOut+1]);  
        });
      }
      console.log('Date entry Data format: ', targetDay);
      console.log('targetDay day of year: ', targetNum);
      console.log('Day difference: ', daysOut);
      var newEvent = {
        eventOwn:$scope.addOwner,
        label:$scope.addLabel,
        time:$scope.addTime,
        date:$scope.addDate,
        street:$scope.addStreet,
        city:$scope.addCity,
        state:$scope.addState,
        zip:$scope.addZip,
        inOut:$scope.outside,
        weatherStatus:wxSts
      };
      Events.addEntry(newEvent);
    };
  }]);
