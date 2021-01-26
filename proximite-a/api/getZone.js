'use strict';

const request = require('request');

/**
 * Renvoie un polygone définissant ce qui peut être atteint
 * en 15 minutes selon un mode de transport donné.

 * position: [longitude, latitude]
 * (ex.: [-1.55, 47.21] pour 1.55 ouest, 47.21 nord)

 * modeTransport: peut être "foot-walking", "wheelchair",
 * "cycling-regular", "cycling-electric" ou "cycling-road"
 * en ce qui nous concerne.
 */
function get15mnZone(position = [-1.55, 47.21], modeTransport = 'foot-walking') {
    let data;
    /*
    request({
        method: 'POST',
        url: 'https://api.openrouteservice.org/v2/isochrones/' + modeTransport,
        body: '{"locations":[['+position+']],"range":[900,1]}',
        headers: {
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            'Authorization': '5b3ce3597851110001cf624829bf42551469445aa00ca476f174c648',
            'Content-Type': 'application/json; charset=utf-8'
        }}, function (error, response, body) {
            console.log('Status:', response.statusCode);
            console.log('Headers:', JSON.stringify(response.headers));
            console.log('Response:', body);
            data = body;
    });
    */
    data = require('./test_ors.json');
    
    let polygon = data.features[0].geometry.coordinates;
    return polygon;
}

