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
     *  - tide (optionnal)    : string included in ["hight", "low"]
     *  - sea (optionnal)     : string included in ["hectic", "calm"]
     *  - planning (optionnal): string of successive string who can be : 
     *                          harbor, lighthouse, car_park
     * 
     * examples :
     * lat=47.6175568&lon=-3.1848329&type=sand&planning=lighthouse,car_park
     * lat=47.6175568&lon=-3.1848329&time=full_moon&weather=clear&sea=calm
     */

    app.get('/api/plage/:filtres', function(req, res) {
        res.send(Plage.getbyfilter(req.params.filtres))
    });
    
};
