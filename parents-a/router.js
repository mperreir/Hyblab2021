'use strict';
const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/parc/all', (req, res) => {
    res.json(db.getAllParc());
});


module.exports = router;
