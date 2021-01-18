// Use strict mode
'use strict';

module.exports = function (app) {
    
    // --Plage--
    const Plage = require("./models/plage")

    // working exemple : http://127.0.0.1:8080/mer-b/api/plage/lat=47.6175568&lon=-3.1848329&type=sable
    app.get('/api/plage/:filtres', function(req, res) {
        res.send(Plage.getbyfilter(req.params.filtres))
    });

};
