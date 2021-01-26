'use strict';

// require body-parser pour les requetes post avec express

const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/parc/all', (req, res) => {
    res.json(db.getAllParc());
});

router.get('/parc/insanetree', (req, res) => {
    res.json(db.getParcWithInsaneTrees());
});

router.get('/parc/aventurier', (req, res) => {
    res.json(db.getParcPourEnfantAventurier());
});

router.get('/parc/grandperiple', (req, res) => {
    res.json(db.getParcGrandPeriple());
});

router.get('/parc/calme', (req, res) => {
    res.json(db.getParcCalme());
});


module.exports = router;