'use strict';

const express = require('express');
const router = express.Router();

const api = require('./api');

router.post('/api/:longitude/:latitude', async function (req, res) {
    const paramCriteres = (req.body.criteres.interests.concat(
        req.body.criteres.disinterests));

    let results =
        await api.all_positions(
            paramCriteres,
            req.body.personas.chosen,
            req.params.longitude, req.params.latitude); 
    res.header("Content-Type", 'application/json');
    return res.send(JSON.stringify(results, null, 4));
});

module.exports = router;
