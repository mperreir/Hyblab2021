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
    let results = await api.all_positions(['pharmacie','boulangerie','supermarche','medecin','arret_bus','ecole','parc','lieu_de_culte','coiffeur','musee','bibliotheque','salle_de_sport'], -1.554093, 47.228982);
    return res.json(results);
    // return res.send("CACA");
});

router.post('/proximite-b/timeline', function (req, res){

    // var username = req.body.username;
    // var password = req.body.password;

    console.log(req.body);

});