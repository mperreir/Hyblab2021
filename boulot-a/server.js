// Use strict mode
'use strict';

const express_module = require('express');
const api_module = require('./api/api.js');
const config = require('./api/config.js');

const path_module = require('path');

const server_app = express_module();

// Minimum routing: serve static content from the html directory
server_app.use(express_module.static(path_module.join(__dirname, 'public')));
server_app.use(express_module.static(path_module.join(__dirname, '../__common-logos__')));

// You can then add whatever routing code you need

server_app.use('/api', api_module(express_module, config));

// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = server_app;
