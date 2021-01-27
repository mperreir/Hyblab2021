'use strict';

const express = require('express');

module.exports = function () {

    const app = new express();

    app.get('/home', function(req, res){
        console.log('brie');
        res.send('henlo my fren');
    })

    return app

};