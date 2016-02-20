var app = angular.module('Evently',[
  'ngRoute',
  'Evently.List',
  'Evently.Add',
  'Evently.Services'
  ]);

app.config(function($routeProvider) {
  $routeProvider
  .when('/',{
    templateUrl:'index.html'
  })
  .when('/newEvent',{
    templateUrl:'newEvent.html',
    controller:'EntryController'
  })
  .when('/listEvents',{
    templateUrl:'listEvents.html',
    controller:'EventListController'
  })
  .otherwise({
    redirectTo: '/'
  });
});