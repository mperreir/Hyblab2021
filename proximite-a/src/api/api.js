'use strict';

const express = require('express');
const { lazy } = require('react');
const { response } = require('../../server');

const addresstocoordinates = require('./adresstocoordinates');
const get15minzone = require('./get15mnZone');
const getzone = require('./getZone');

module.exports = function () {

    const app = new express();

    app.get('/adresse/*', function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        const path = decodeURI(req.url).split('/');
        addresstocoordinates.addresstocoordinates(path[2])
            .then(data => {res.json(data)});

    })

    app.get('/coordinates/*', async function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        const path = decodeURI(req.url).split('/');
        let coordinates = path[2].split('_');
        coordinates = {latitude: coordinates[0], longitude: coordinates[1]};
        let data = await addresstocoordinates.coordinatestoaddress(coordinates);
        res.json(data);

    })

    app.get('/get15minzone/*/*/', function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        const path = decodeURI(req.url).split('/');
        let coordinates = path[2].split('_');
        coordinates= coordinates.map(x => parseFloat(x));
        get15minzone.get15mnZone(coordinates, path[3])
            .then(data => {res.json(data)});
    })

    app.get('/getlocationsforprofile/*/*/*', async function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        const path = decodeURI(req.url).split('/');
        let coordinates = await addresstocoordinates.addresstocoordinates(path[2]);
        coordinates = [coordinates.longitude, coordinates.latitude];
        let polygon = await get15minzone.get15mnZone(coordinates, path[3]);
        let points = await getzone.getPointsInZoneForProfile(polygon, path[4]);
        res.json(points);
    })

    app.get('/getlocations/*/*/*', async function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        const path = decodeURI(req.url).split('/');
        let coordinates = await addresstocoordinates.addresstocoordinates(path[2]);
        coordinates = [coordinates.longitude, coordinates.latitude];
        let polygon = await get15minzone.get15mnZone(coordinates, path[3]);
        let typeslieux = path[4].split('-');
        let points = await getzone.getPointsInZone(polygon, typeslieux);
        res.json(points);
    })


    return app;

};