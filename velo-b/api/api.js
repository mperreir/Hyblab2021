'use strict';

// import des module Utiles
const express = require('express');
const fs = require('fs');
const fetch = require('node-fetch');

const API_NANTES_ROUTES = {
    parcs_relais: "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parcs-relais-nantes-metropole-disponibilites&q=&lang=fr&facet=grp_nom&facet=grp_statut",
    disponibilites_bicloo: "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_stations-velos-libre-service-nantes-metropole-disponibilites&q=&lang=fr&facet=banking&facet=bonus&facet=status&facet=contract_name",
    places_parking: "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes-disponibilites&q=&lang=fr&facet=grp_nom&facet=grp_statut",
}

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
    app.get('/abris-velo/:quartier', JsonRoute((req) => loadJSONFile('abris-velo.json')[req.params['quartier']]));
    app.get('/amenagements-cyclables/:quartier', JsonRoute((req) => loadJSONFile('amenagements-cyclables.json')[req.params['quartier']]));
    app.get('/gonfleurs-libre-service/:quartier', JsonRoute((req) => loadJSONFile('gonfleurs-libre-service.json')[req.params['quartier']]));
    app.get('/stations-velo-libre-service/:quartier', JsonRoute((req) => loadJSONFile('stations-velo-libre-service.json')[req.params['quartier']]));
    app.get('/arrets-tan/:quartier', JsonRoute((req) => loadJSONFile('arrets-tan.json')[req.params['quartier']]));
    app.get('/velocistes/:quartier', JsonRoute((req) => loadJSONFile('velocistes.json')[req.params['quartier']]));
    app.get('/services-velos-bicloo/', JsonRoute(() => loadJSONFile('services-velos-bicloo.json')));

    // routes depuis l'api de nantes metropole
    app.get('/disponibilites-parcs-relais/:quartier', JsonRoute((req) => fetchData(API_NANTES_ROUTES.parcs_relais, req.params['quartier'])));
    app.get('/disponibilites-places-parking/:quartier', JsonRoute((req) => fetchData(API_NANTES_ROUTES.places_parking, req.params['quartier'])));
    app.get('/disponibilites-bicloo/:quartier', JsonRoute((req) => fetchData(API_NANTES_ROUTES.disponibilites_bicloo, req.params['quartier'])));

    app.get('/update/', (req,res) => update(req, res));

    // utilitaire pour créer une route qui envoie du json
    function JsonRoute(callback) {
        return async function(req, res) {
            res.set({
                'Content-Type': 'application/json',
                'charset': 'utf-8'
            });
            res.send(JSON.stringify(await callback(req, res)));
        };
    }

    function update(req, res) {
        const api_routes = loadJSONFile('nantes-api-fetcher.json');
        const quartiers = loadJSONFile('quartiers.json');
        api_routes.forEach(async o => {
            let data = {};
            if(o.quartiers){
                for (const k of Object.keys(quartiers)) {
                    data[k] = await fetchData(o.route, k);
                }
            }else{
                data = await fetchData(o.route);
            }
            fs.writeFileSync(`./velo-b/api/data/${o.fileName}`, JSON.stringify(data));
        })
        res.send('Done');
    }

    /*
    @param base_url: string
    @param quartier?: string ("nord","sud","est","ouest")
     */
    async function fetchData(base_url, quartier=undefined){
        let url = base_url;
        if(quartier) {
            const quartiers = loadJSONFile('quartiers.json');
            const polygon_api = quartiers[quartier].reduce((acc, val) => acc + `(${val[0]}%2C${val[1]})%2C`, '').slice(0, -3);
            url += '&geofilter.polygon=' + polygon_api;
        }
        const response = await fetch(url);
        return await response.json();
    }

    return app;
}
