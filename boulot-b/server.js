// Use strict mode
'use strict';


let getAll = require('./api.js');
// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');

var app = express();

// Minimum routing: serve static content from the html directory
app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

// You can then add whatever routing code you need

app.use(express.static('public'));

app.get('/trajet/:depart/:arrivee/:transport/:style/:sallesport/:bar/:boulangerie/:pharmacie', async (req, res) => getAll(req, res))

let port = 8080;
//let api = require('./api');


app.use('/images', express.static(__dirname +'/frontend/src/assets/map'));

app.listen(port);

// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;
