'use strict';

// general routing framework
var express = require('express');
//var basicAuth = require('basic-auth-connect');
var app = express();

// password protection
//app.use(basicAuth('story2020', 'ilovestory'));

// declare the list of sub apps
var app_names = [];

var hyblab2021_names = ['boulot-a', 'boulot-b', 'mer-a', 'mer-b', 'parents-a',
    'parents-b', 'proximite-a', 'proximite-b', 'velo-a', 'velo-b'
];

app_names.push.apply(app_names, hyblab2021_names);

var sub_apps = [];

// create sub apps
// and register sub-apps
app_names.forEach(function(element, index, array) {
    console.log('Registering: ' + element);
    sub_apps[element] = require('./' + element + '/server');
    app.use('/' + element, sub_apps[element]);
});

// redirect catch all url to hyblab website (disabled for dev)
//app.use(/\/$/,function(req, res, next){
//	res.redirect('http://www.hyblab.fr/');
//});



// launch main server app

//Pour ipv6 : http://[@IPv6]:port

//warning:  do not change the port, it will be automatically taken from env en dev and prod servers ...
var port = 'PORT' in process.env ? process.env.PORT : 8080;
var server = app.listen(port, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Hyblab routing app listening at  http://localhost:8080/')

});
