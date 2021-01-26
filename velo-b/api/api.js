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
    
    // routes depuis les fichiers json
    app.get('/abris-velos/:quartier', JsonRoute((req,res) => loadJSONFile('abris-velos.json')[req.params['quartier']]));
    app.get('/amenagements-cyclables/:quartier', JsonRoute((req,res) => loadJSONFile('amenagements-cyclables.json')[req.params['quartier']]));
    app.get('/gonfleurs-libre-service/:quartier', JsonRoute((req,res) => loadJSONFile('gonfleurs-libre-service.json')[req.params['quartier']]));
    app.get('/services-velos-bicloo/', JsonRoute((req,res) => loadJSONFile('services-velos-bicloo.json')));
    app.get('/stations-velos-libre-service/:quartier', JsonRoute((req,res) => loadJSONFile('stations-velos-libre-service.json')[req.params['quartier']]));
    app.get('/tan-arrets/:quartier', JsonRoute((req,res) => loadJSONFile('tan-arrets.json')[req.params['quartier']]));
    app.get('/velocistes/:quartier', JsonRoute((req,res) => loadJSONFile('velocistes.json')[req.params['quartier']]));
    
    // routes depuis l'api de nantes metropole
    //app.get('/parcs-relais-disponibilites/:quartier', JsonRoute((req,res) => TODO ));
    //app.get('/parkings-publics-disponibilites/:quartier', JsonRoute((req,res) => TODO ));
    //app.get('/stations-velos-libre-service-disponibilites/:quartier', JsonRoute((req,res) => TODO ));
    
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
