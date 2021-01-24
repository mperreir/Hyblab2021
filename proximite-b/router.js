'use strict';

const express = require('express');
const router = express.Router();
const api = require('./api');



//
router.get('/frise/:criteres/:lat/:long', function (req, res){
    let results = api.all_positions(req.param.criteres, req.param.lat, req.param.long);
    return res.json(results);
});

router.post('/address', (req, res) => {
    return res.json(req.body);
});
router.post('/conclu', (req, res) => {
    return res.json(req.body);
});
router.post('/criteres', (req, res) => {
    return res.json(req.body);
});
router.post('/index', (req, res) => {
    return res.json(req.body);
});
router.post('/personas', (req, res) => {
    return res.json(req.body);
});

router.post('/timeline', function (req, res){

    // var username = req.body.username;
    // var password = req.body.password;

    console.log(req.body);
    return res.json(req.body);


});

module.exports = router;
