'use strict';

const express = require('express');
const router = express.Router();

const api = require('./api');


router.get('/api', async function (req, res){
    let results = await api.all_positions(['Boulangerie','Médecin','Ecole','Supermarché','Parc','Pharmacie','Lieu de culte','Arrêt de bus','Coiffeur','Musee','Bibliotheque','Salle de sport'], 'jeune', -1.547090210478156, 47.2191999412145); // -1.554093, 47.228982
    res.header("Content-Type",'application/json');
    return res.send(JSON.stringify(results, null, 4));
});




router.post('/api/:longitude/:latitude', async function (req, res) {
    //TODO CHECK IF req.body est du bon type et bon contenu (cd sous ensemble de :
    //['Boulangerie','Médecin','Ecole','Supermarché','Parc',
    //'Pharmacie','Lieu de culte','Arrêt de bus','Coiffeur',
    //'Musee','Bibliotheque','Salle de sport'])

    const paramCriteres = (req.body.criteres.interests.concat(
        req.body.criteres.disinterests));

    let results =
        await api.all_positions(
            paramCriteres,
            req.body.personas.chosen,
            req.params.longitude, req.params.latitude); 
    console.log('Requete terminee');
    res.header("Content-Type", 'application/json');
    return res.send(JSON.stringify(results, null, 4));
});

router.post('/proximite-b/timeline', function (req, res) {

    // var username = req.body.username;
    // var password = req.body.password;

    console.log(req.body);

});
module.exports = router;
