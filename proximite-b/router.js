'use strict';

const express = require('express');
const router = express.Router();

const api = require('./api');

//export our router to be able to require() it
module.exports = router;

// router.get('/frise/:criteres/:lat/:long', function (req, res){
//     let results = api.all_positions(req.param.criteres, req.param.lat, req.param.long);
//     return res.json(results);
// });

router.get('/api', async function (req, res){
    let results = await api.all_positions(['Boulangerie','Médecin','Ecole','Supermarché','Parc','Pharmacie','Lieu de culte','Arrêt de bus','Coiffeur','Musee','Bibliotheque','Salle de sport'], 'young', -1.547090210478156, 47.2191999412145); // -1.554093, 47.228982
    res.header("Content-Type",'application/json');
    return res.send(JSON.stringify(results, null, 4));
});

router.post('/proximite-b/timeline', function (req, res){

    // var username = req.body.username;
    // var password = req.body.password;

    console.log(req.body);

});