'use strict';

const express = require('express');
const router = express.Router();
const api = require('./api');



//
router.get('/frise/:criteres/:lat/:long', function (req, res){
    let results = api.all_positions(req.param.criteres, req.param.lat, req.param.long);
    return res.json(results);
});

module.exports = router;
