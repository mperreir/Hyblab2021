'use strict';

var request = require('request');

request({
  method: 'POST',
  url: 'https://api.openrouteservice.org/v2/isochrones/foot-walking',
  body: '{"locations":[[-1.55,47.2]],"range":[900,1]}',
  headers: {
    'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
    'Authorization': '5b3ce3597851110001cf624829bf42551469445aa00ca476f174c648',
    'Content-Type': 'application/json; charset=utf-8'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
