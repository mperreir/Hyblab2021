// Use strict mode
'use strict';

module.exports = function (app) {
    
    const plage = require("./plage.js")

    /**
     * filtres should be write as : c1=p1&c2=p2&c3=pa3...
     *    with ci as a criteria and pi a parameter
     * 
     * list of criteria :
     *  - radius              : float cast as a string
     *  - latitude            : float cast as a string
     *  - longitude           : float cast as a string
     *  - type (optionnal)    : string included in ["sand", "pebble", "rocks"]
     *  - time (optionnal)    : string included in ["dawn", "day", "dusk", "night"]
     *  - weather (optionnal) : string included in ["clear", "cloudy", "bad", "stormy"]
     *  - sea (optionnal)     : string included in ["hectic", "calm"]
     *  - planning (optionnal): string of successive string who can be : 
     *                          harbor, lighthouse, car_park
     *                          associate with a distance in cracket in meter
     * 
     * examples :
     * - latitude=47.6175568&longitude=-3.1848329&planning=lighthouse(1000),car_park(500)
     * - latitude=47.6175568&longitude=-3.1848329&time=dawn&weather=clear
     */

    app.get('/api/plage/:filtres', async function(req, res) {
        const plages = await plage.getbyfilter(req.params.filtres);
        res.send(plages)
    });

    /** 
     * Example of output :
     * 
     * {
     *      "ok": true,
     *      "status": 200,
     *      "descritption": "All things done succesfully",
     *      "output": [{
     *          "latitude": 47.6229851,
     *          "longitude": -3.456117,
     *          "nom": "Crique naturiste",
     *          "type": null,
     *          "phare": {
     *             "latitude": 47.6438269,
     *             "longitude": -3.4470463,
     *             "name": "Port Tudy"
     *          },
     *          "phare": {
     *             "latitude": 47.6438269,
     *             "longitude": -3.4470463,
     *             "name": "nom du phare"
     *          },
     *          "parking": {
     *             "latitude": 47.6438269,
     *             "longitude": -3.4470463,
     *             "name": "nom du parking"
     *          },
     *          "time": "2021-01-28T12:00:00.000Z",
     *          "weather": {
     *              "temperature": "12.11",
     *              "feels_like": "3.33",
     *              "sunrise": "2021-01-28T07:45:19.000Z",
     *              "sunset": "2021-01-28T17:08:03.000Z"
     *          }
     *     },
     *        ... (max 3)
     *     ]
     * }
     * 
     * {
     *  "ok":false
     *  "status":400
     *  "descritption":"Bad request",
     *  "details":"An error has occured with the input planning concerning the distance of harbor"
     * }
     * 
     */
    
};
