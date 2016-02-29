angular.module('Evently.Add',[])
  .controller('EntryController', ['$scope','Events','$filter', function($scope, Events, $filter){
    // var wxObj = Events.wx($scope.addZip);
    $scope.showValue = true;
    $scope.addEvent = function () {
      $scope.showValue = false;
      // Function to get current Day of Year
      // For comparison against Weather API days
      Date.prototype.getDOY = function() {
        var onejan = new Date(this.getFullYear(),0,1);
        return Math.ceil((this - onejan) / 86400000);
      };
      console.log($scope.addDate);
      var wxSts = 0;
      var today = new Date();
      var targetDay = $scope.addDate;
      var todayNum = today.getDOY();
      var targetNum = targetDay.getDOY();
      var daysOut = targetNum - todayNum;
      $scope.data = {};
      var newEvent = {
        eventOwner:$scope.addOwner,
        title:$scope.addLabel,
        time:$filter('date')($scope.addTime, 'shortTime'),
        date:$filter('date')($scope.addDate, 'shortDate'),
        streetAddress:$scope.addStreet,
        city:$scope.addCity,
        state:$scope.addState,
        zipCode:$scope.addZip,
        indoorOutdoor:$scope.outside,
        weatherStatus:wxSts
      };
      // var addEntryPromise;
      if(daysOut < 9){
        Events.wx($scope.addZip, function(res){
          // console.log('Returned Wx Object 10Day Hourly: ', res);
          var wxCond = res.forecast.simpleforecast.forecastday[daysOut+1];
          // console.log('Returned Wx object: ', wxCond);
          newEvent.estimatedWeather = wxCond.conditions+' '+'With a High Temperature of '+wxCond.high.fahrenheit+' F';
          Events.addEntry(newEvent);
          // $scope.estimatedWeather = newEvent.estimatedWeather;
          // $scope.eventEntry.$setPristine();
          $scope.eventEntry.$setUntouched();
        });
      } else {
        newEvent.estimatedWeather = 'Conditions are Unknown at this time. Check back when you are within 10 days of your event.';
        Events.addEntry(newEvent);
        // $scope.estimatedWeather = newEvent.estimatedWeather;
      }

      // addEntryPromise.then(function(data) {
      //   window.alert('Event successfully created!');
      // }).catch(function(err){
      //   window.alert('Unable to create event.')
      // })
      // console.log('Date entry Data format: ', targetDay);
      // console.log('targetDay day of year: ', targetNum);
      // console.log('Day difference: ', daysOut);
    };

    $scope.testData = function(event) {
      event.preventDefault();
      $scope.addOwner = "a@b.com";
      $scope.addLabel = "label!";
      $scope.addZip = "39183";
    }
  }]);


// 03:10 PM