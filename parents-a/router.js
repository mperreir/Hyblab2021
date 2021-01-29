'use strict';

// require body-parser pour les requetes post avec express

const express = require('express');
const router = express.Router();
const db = require('./db');
const body_parser = require('body-parser');

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


router.get('/parc/aventurier', (req, res) => {
    res.json(db.getParcAventurier());
});


router.get('/parc/non-aventurier', (req, res) => {
    res.json(db.getParcNonAventurier())
});


router.get('/parc/aventurier/plein-la-vue', body_parser.json(), (req, res) => {
    res.json(db.getParcPleinLaVue(req.body.data))
});


router.get('/parc/aventurier/non-plein-la-vue', body_parser.json(), (req, res) => {
    res.json(db.getParcNonPleinLaVue(req.body.data))
});


router.get('/parc/aventurier/plein-la-vue/beau-decor', body_parser.json(), (req, res) => {
    res.json(db.getParcBeauDecor(req.body.data))
});


router.get('/parc/aventurier/plein-la-vue/beau-paysage', body_parser.json(), (req, res) => {
    res.json(db.getParcBeauPaysage(req.body.data))
});


router.get('/parc/aventurier/plein-la-vue/beau-paysage/avec-animaux', body_parser.json(), (req, res) => {
    res.json(db.getParcAvecAnimaux(req.body.data))
});


router.post('/parc/non-aventurier/animaux', body_parser.json(), (req, res) => {
    const data = req.body.data;
    res.json(db.getEcouterDesAnimaux(data));
});


router.post('/parc/non-aventurier/nature', body_parser.json(), (req, res) => {
    const data = req.body.data;
    res.json(db.getEcouterNature(data));
});


router.post('/parc/non-aventurier/animaux/decouvrir-arbres', body_parser.json(), (req, res) => {
    const data = req.body.data;
    res.json(db.getDecouvrirArbre(data));
});


router.post('/parc/non-aventurier/nature/parfums', body_parser.json(), (req, res) => {
    const data = req.body.data;
    res.json(db.getDecouvrirParfum(data));
});


router.post('/parc/Centre', body_parser.json(), (req, res) => {
    const data = req.body.data;
    res.json(db.getCentre(data));
});


router.post('/parc/Ouest', body_parser.json(), (req, res) => {
    const data = req.body.data;
    res.json(db.getOuest(data));
});

router.post('/parc/Nord', body_parser.json(), (req, res) => {
    const data = req.body.data;
    res.json(db.getNord(data));
});

router.post('/parc/Sud', body_parser.json(), (req, res) => {
    const data = req.body.data;
    res.json(db.getSud(data));
});





module.exports = router;