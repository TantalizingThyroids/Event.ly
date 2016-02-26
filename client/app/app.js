var app = angular.module('Evently',[
  'ngRoute',
  'Evently.List',
  'Evently.Add',
  'Evently.Services',
  'Evently.Delete'
  ]);

app.config(function($routeProvider) {
  $routeProvider
  .when('/',{
    templateUrl:'../views/index.html'
  })
  .when('/newEvent',{
    templateUrl:'../views/newEvent.html',
    controller:'EntryController'
  })
  .when('/listEvents',{
    templateUrl:'../views/listEvents.html',
    controller:'EventListController'
  })
  .when('/deleteEvent', {
    templateUrl:'../views/deleteEvent.html',
    controller:'DeleteController'
  });
  // .otherwise({
  //   redirectTo: 'index.html'
  // });
});