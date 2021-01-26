'use strict';

// import des module Utiles
const express = require('express');
const fs = require('fs');

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

    return app;
}
