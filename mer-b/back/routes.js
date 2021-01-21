// Use strict mode
'use strict';

module.exports = function (app) {
    
    const Plage = require("./models/plage")

    /**
     * filtres should be write as : c1=p1&c2=p2&c3=pa3...
     *    with ci as a criteria and pi a parameter
     * 
     * list of criteria :
     *  - latitude            : float cast as a string
     *  - longitude           : float cast as a string
     *  - type (optionnal)    : string included in ["sand", "pebble", "rocks"]
     *  - time (optionnal)    : string included in ["sunrise", "sunset", "day",
     *                          "night", "full_moon", "new_moon", "crescent"]
     *  - weather (optionnal) : string included in ["clear", "cloudy", "bad",
     *                          "stormy"]
     *  - sea (optionnal)     : string included in ["hectic", "calm"]
     *  - planning (optionnal): string of successive string who can be : 
     *                          harbor, lighthouse, car_park
     * 
     * examples :
     * - latitude=47.6175568&longitude=-3.1848329&planning=lighthouse,car_park
     * - latitude=47.6175568&longitude=-3.1848329&time=full_moon&weather=clear
     */

    app.get('/api/plage/:filtres', function(req, res) {
        res.send(Plage.getbyfilter(req.params.filtres))
    });

    
    
};
