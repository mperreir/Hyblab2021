'use strict';

const express = require('express');
const { response } = require('../../server');

const addresstocoordinates = require('./adresstocoordinates');
const get15minzone = require('./get15mnZone');

module.exports = function () {

    const app = new express();

    app.get('/adresse/*', function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        const path = decodeURI(req.url).split('/');
        addresstocoordinates.addresstocoordinates(path[2])
            .then(data => {res.json(data)});

    })

    app.get('/get15minzone/*/*/', function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        const path = decodeURI(req.url).split('/');
        let coordinates = path[2].split('_');
        coordinates= coordinates.map(x => parseFloat(x));
        console.log(coordinates);
        console.log(path[3])
        get15minzone.get15mnZone(coordinates, path[3])
            .then(data => {res.json(data)});
    })


    return app

};