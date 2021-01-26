'use strict';

// import des module Utiles
const express = require('express');
const fs = require('fs');
const fetch = require('node-fetch');

function loadJSONFile(file_name){
    let rawdata = fs.readFileSync(`./velo-b/api/data/${file_name}`);
    let jsondata = JSON.parse(rawdata);
    return jsondata
}

// export de notre application vers le serveur principal
module.exports = () => {

    // création d'une app express
    const app = express();

    // routes
    app.get('/abris-velos/:quartier', JsonRoute((req,res) => loadJSONFile('abris-velos-nantes-metropole.json')[req.params['quartier']]));
    app.get('/test/',JsonRoute((req, res) => loadJSONFile('abris-velos-nantes-metropole.json')));
    app.get('/update/', update);
    // utilitaire pour créer une route qui envoie du json
    function JsonRoute(callback) {
        return function(req, res) {
            res.set({
                'Content-Type': 'application/json',
                'charset': 'utf-8'
            });
            res.send(JSON.stringify(callback(req, res)));
        };
    }

    function update(req, res, next) {
        const api_routes = loadJSONFile('nantes-api-fetcher.json');
        const quartiers = loadJSONFile('quartiers.json');
        api_routes.forEach(async o => {
            const data = {};
            for (const k of Object.keys(quartiers)) {
                const polygon_api = quartiers[k].reduce((acc, val) => acc + `(${val[0]}%2C${val[1]})%2C`,'').slice(0, -3);
                const url = o.route + '&geofilter.polygon=' + polygon_api;
                const response = await fetch(url);
                data[k] = await response.json();
            }
            fs.writeFileSync(`./velo-b/api/data/${o.fileName}`, JSON.stringify(data));
        })
        res.send('Done');
    }

    return app;
}
