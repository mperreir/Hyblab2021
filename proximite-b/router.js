'use strict';

const express = require('express');
const router = express.Router();
const api = require('./api');

//export our router to be able to require() it
module.exports = router;


//
router.get('/frise/:criteres/:lat/:long', function (req, res){
    let results = api.all_positions(req.param.criteres, req.param.lat, req.param.long);
    return res.json(results);
});


router.post('/proximite-b/timeline', function (req, res){

    // var username = req.body.username;
    // var password = req.body.password;

    console.log(req.body);

});