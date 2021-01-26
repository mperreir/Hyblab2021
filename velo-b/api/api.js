'use strict';

// import des module Utiles
const express = require('express');

// export de notre application vers le serveur principal
module.exports = () => {

    // création d'une app express
    const app = express();
    
    // exemple de route
    //app.get('/example/', JsonRoute((req, res) => SQL(`select * from Example;`)));
    
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

