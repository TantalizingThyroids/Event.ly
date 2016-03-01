var event = require('../model/event.js');
var eventController = require('../controllers/eventController.js');
var https = require('https');
// var Promise = require('bluebird');
var request = require('request');
var Mailgun = require('mailgun-js');

//Api key, from Mailgun’s Control Panel
var api_key = 'key-e1b50883b2949b370d9bbf222a188a2b';

//Your domain, from the Mailgun Control Panel
var domain = 'sandbox2fd7054e03fc4074b11daafae9b2e9eb.mailgun.org';

//Your sending email address
var from_who = 'ross.ad@gmail.com';

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

// API request for 10 day forcast

var wx = function(zip, callback){
  var reqPath = '/api/70ba34089d4744a1/forecast10day/q/'+zip+'.json';
  request('https://api.wunderground.com'+reqPath, function(err, res, body){
    if (!err && res.statusCode == 200) {
      // console.log(body);
      callback(JSON.parse(body)); 
    }
  });
};

// Function that updates each record in table to current weather information
// Will update event owner of any changes
module.exports.wxCheck = function(userID){
  Date.prototype.getDOY = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((this - onejan) / 86400000);
  };
  var wxSts = 0;
  var today = new Date();
  // var targetDay = $scope.addDate;
  var todayNum = today.getDOY();
  // var targetNum = targetDay.getDOY();
  console.log('Inside WxCheck!');
  event.getByOwner(userID ,function (err, data) {
    var eventArr;
    console.log("Inside get by owner");
    if(err) {
      return res.status(500).json(err);
    }
    console.log('getAll response: ', data);
    eventArr = data;
  
    // for(var i = 0; i < eventArr.length; i++){
    eventArr.forEach(function(item, i){ 
      var id = item.eventID;
      console.log('event Obj: ', item);
      var date = new Date(item.date);
      var targetNum = date.getDOY();
      console.log('target date num: ', targetNum);
      var zip = item.zipCode;
      console.log('Current Zip: ', zip);
      var daysOut = targetNum - todayNum;
      console.log('Days Out:', daysOut);

      // Check if Event date is within 10 days of today
      if(daysOut < 9){
        wx(zip, function(data){
          // grab current forcasted weather for target day
          console.log('Index passed:' , i);
          var currEvent = item;
          console.log('Current Event Inside Wx Method: ', eventArr);
          var timeStamp = today.toString();
          var currForc = data.forecast.simpleforecast.forecastday[daysOut+1];
          // console.log('Current Weather Info: ', currForc);
          var estWx = currForc.conditions+' '+'With a High Temperature of '+currForc.high.fahrenheit+' F';
          console.log('Est weather string:', estWx);

          event.updateWx(estWx, id);
          event.updateStamp(timeStamp, id);
          console.log('Owner Email: ', item.eventOwner);
          if(wxTerm[currForc.conditions] !== item.weatherStatus){
            event.updateWx(wxTerm[currForc.conditions], id);
            event.updateStamp(timeStamp, id);
            var mailgun = new Mailgun({apiKey: api_key, domain: domain});
            var mailData = {
                //Specify email data
                  from: from_who,
                //The email to contact
                  to: item.eventOwner,
                //Subject and text data  
                  subject: 'Hello from Event.ly!!',
                  html: 'Hello! You are recieving this email due to a change in weather conditions for your scheduled event.  Current Event information is as follows:'+ 
                    '<div><h2>Title:'+item.title+'</h2><p>Event ID:'+item.eventID+'</p><p>Event Owner Email:'+item.eventOwner+'</p><p>Time:'+item.time+'</p><p>Date:'+item.date+'</p><p>Street Address:'+item.streetAddress+'</p><p>City:'+item.city+'</p><p>State:'+item.state+'</p><p>Zip Code:'+item.zipCode+'</p><p>Outside?'+item.indoorOutdoor+'</p><p>Estimated Weather:'+item.estimatedWeather+'</p><p>Current Weather Status:'+item.weatherStatus+'</p><p>Last Update:'+item.lastUpdate+'</p></div>'
                };
            mailgun.messages().send(mailData, function (err, body) {
                    //If there is an error, render the error page
                    if (err) {
                        console.log("got an error: ", err);
                    }
                    //Else we can greet    and leave
                    else {
                        //Here "submitted.jade" is the view file for this landing page 
                        //We pass the variable "email" from the url parameter in an object rendered by Jade
                        console.log(body);
                    }
                });
            // Email change in weather status to user
          }
        });
      }
    });
  });
};


