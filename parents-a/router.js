'use strict';

// require body-parser pour les requetes post avec express

const express = require('express');
const router = express.Router();
const db = require('./db');
const body_parser = require('body_parser');

router.get('/parc/all', (req, res) => {
    res.json(db.getAllParc());
});

// router.get('/parc/insanetree', (req, res) => {
//     res.json(db.getParcWithInsaneTrees());
// });

// router.get('/parc/aventurier', (req, res) => {
//     res.json(db.getParcPourEnfantAventurier());
// });

// router.get('/parc/grandperiple', (req, res) => {
//     res.json(db.getParcGrandPeriple());
// });

// router.get('/parc/calme', (req, res) => {
//     res.json(db.getParcCalme());
// });

router.get('/parc/aventurier', (req,res) => {
    res.json(db.getParcAventurier());
});

router.get('/parc/non-aventurier', (req, res) => {
    res.json(db.getParcNonAventurier())
});

router.get('/parc/plein-la-vue', body_parser.json(), (req, res) => {
    res.json(db.getParcPleinLaVue(req.body.data))
});

router.get('/parc/non-plein-la-vue', body_parser.json(), (req, res) => {
    res.json(db.getParcNonPleinLaVue(req.body.data))
});

router.get('/parc/beau-decor', body_parser.json(), (req, res) => {
    res.json(db.getParcBeauDecor(req.body.data))
});

router.get('/parc/beau-paysage', body_parser.json(), (req, res) => {
    res.json(db.getParcBeauPaysage(req.body.data))
});

router.get('/parc/avec-animaux', body_parser.json(), (req, res) => {
    res.json(db.getParcAvecAnimaux(req.body.data))
});

module.exports = router;