// Use strict mode
'use strict';

var path = require('path');
const env = require('dotenv');
env.config({ path: path.resolve(process.cwd(), 'proximite-b/.env') });

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');
const router = require('./router');
const bodyParser = require('body-parser');



var app = express();
app.use(express.json());
app.use(bodyParser.json())


// Minimum routing: serve static content from the html directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x - client - key, x - client - token, x - client - secret, Authorization");
    next();
});
app.use(router);

app.use(router);

// You can then add whatever routing code you need

// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;