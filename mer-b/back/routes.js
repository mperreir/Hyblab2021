// Use strict mode
'use strict';

module.exports = function (app) {
    
    // --Plage--
    const Plage = require("./models/plage")

    app.get('/api/plage/:filtre', function(req, res) {
        res.send(Plage.getbyfilter(req.params.filtre))
    });

};
