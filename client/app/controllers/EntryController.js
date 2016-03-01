angular.module('Evently.Add',[])
  .controller('EntryController', ['$scope','Events','$filter', function($scope, Events, $filter){
    /* Object containing possible weather forcast words/phrases supplied by WunderGround API
       Value assigned to each description representing Good (1), Bad (-1), Unknown (0) */
    var wxTerm = {
      'Chance of Flurries':-1,
      'Chance of Rain':-1,
      'Chance Rain':-1,
      'Chance of Freezing Rain':-1,
      'Chance of Sleet':-1,
      'Chance of Snow':-1,
      'Chance of Thunderstorms':-1,
      'Chance of a Thunderstorm':-1,
      'Clear':1,
      'Cloudy':1,
      'Flurries':-1,
      'Fog':-1,
      'Haze':1,
      'Mostly Cloudy':1,
      'Mostly Sunny':1,
      'Partly Cloudy':1,
      'Partly Sunny':1,
      'Freezing Rain':-1,
      'Rain':-1,
      'Sleet':-1,
      'Snow':-1,
      'Sunny':1,
      'Thunderstorms':-1,
      'Thunderstorm':-1,
      'Unknown':0,
      'Overcast':1,
      'Scattered Clouds':1
    };
    /* On button click, add event to database, get currently forcasted weather within 10 days
     of creation date */
    $scope.addEvent = function () {
      /* Function to get current Day of Year
         For comparison against Weather API days */
      Date.prototype.getDOY = function() {
        var onejan = new Date(this.getFullYear(),0,1);
        return Math.ceil((this - onejan) / 86400000);
      };
      
      // Variables to get day of year for creation day and event day for range comparison
      var wxSts = 0;
      var today = new Date();
      var targetDay = $scope.addDate;
      var todayNum = today.getDOY();
      var targetNum = targetDay.getDOY();
      /* Hold difference in days between creation day and event day, forecast on 
         goes 9 days past creation day */
      var daysOut = targetNum - todayNum;
      // Initial object to hold entered information from event form
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
      // Check if scheduled event is within range of forecast
      if(daysOut < 9){
        /* Wunderground API call in services.js, takes entered zipcode for location 
           information to tailer weather information */
        Events.wx($scope.addZip, function(res){
          // Grab weather forecast information for event day
          var wxCond = res.forecast.simpleforecast.forecastday[daysOut+1];
          // Grab specific condition description for event day
          var cond = wxCond.conditions;
          /* Create string describing weather for event day with condition 
             description and high temp for day, add to event object */
          newEvent.estimatedWeather = cond+' '+'With a High Temperature of '+wxCond.high.fahrenheit+' F';
          // Grab weather icon asociated with conditions given in API request, add to event object
          newEvent.weatherIcon = wxCond.icon_url;
          // Grab good/bad weather status from object above, add to event object
          newEvent.weatherStatus = wxTerm[cond];
          // Create time stamp for weather check, add to event object
          newEvent.lastUpdate = today.toString();
          // Add event object to database
          Events.addEntry(newEvent);
          // TODO: Clear form once item added
          $scope.eventEntry.$setUntouched();
        });
      } else {
        // If event outside of forecast range, consider unknown at this time
        newEvent.estimatedWeather = 'Conditions are Unknown at this time. Check back when you are within 10 days of your event.';
        // Add to event object to database
        Events.addEntry(newEvent);
      }
    };
  }]);


// 03:10 PM