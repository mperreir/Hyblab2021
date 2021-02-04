'use strict';

// Load usefull expressjs and nodejs objects / modules
const express = require('express');
const path = require('path');

const app = express();

// Minimum routing: serve static content from the html directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

// Redirect 404 to index
app.get('*', function(req, res){
    res.status(404).redirect("./");
});

/**
 * exports route velo-a
 * @type {Express}
 */
module.exports = app;
