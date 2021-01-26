'use strict';

const fetch = require('node-fetch');

async function all_positions(list_criteres, longitude, latitude){
    const time = 15*60;
    let a = await fetch("https://api.openrouteservice.org/v2/isochrones/foot-walking", 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.OPENROUTE_SERVICE_KEY
        },
        body: JSON.stringify({
            "locations": [
                [
                    longitude,
                    latitude
                ]
            ],
            "range": [time],
            "range_type": "time",
            "options": {
                avoid_features: ["ferries", "fords"]
            }
        })
    });

    a = await a.json();
    a = a.features[0].geometry.coordinates[0];
    let minLon = 100;
    let minLat = 100;
    let maxLon = -100;
    let maxLat = -100;
    for(let i = 0; i < a.length; i++) {
        if(a[i][0] < minLon)
            minLon = a[i][0];
        if(a[i][1] < minLat)
            minLat = a[i][1];
        if(a[i][0] > maxLon)
            maxLon = a[i][0];
        if(a[i][1] > maxLat)
            maxLat = a[i][1];
    }
    
    let response = await fetch("http://overpass-api.de/api/interpreter?data=[out:json];node[amenity]("+minLat+","+minLon+","+maxLat+","+maxLon+");out;");
    response = await response.json();
    console.log(minLon, minLat, maxLon, maxLat);
    console.log("nb elements dans le carré : ", response.elements.length);
    let elements = response.elements.filter(el => inside([el.lon, el.lat], a));
    console.log("nb elements dans le polygone : ", elements.length);
    // 47.248951,-1.491051,47.228973,-1.554004
    // Mention honorable : AMNITY bar 	cafe fast_food restaurant

    // Pharmacie  AMNITY pharmacy
    // Boulangerie  SHOP  bakery
    // Supermarché  SHOP greengrocer department_store general kiosk supermarket mall
    // Médecin  	AMNITY clinic 	dentist doctors hospital
    // Arrêt bus    AMNITY bus_station
    // Ecole 	AMNITY kindergarten college school university
    // Parc     LEISURE garden  park
    // Lieu de culte   AMNITY place_of_worship   https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dplace_of_worship
    // -----------------
    // Coiffeur    shop=hairdresser
    // Musée    TOURISM = museum
    // Biblio  	amenity=library
    // Salle de sport   LEISURE fitness_centre sports_centre fitness_station

    const config = {
        // LES PRINCIPAUX
        pharmacie: {
            type: 'amenity',
            attributes: ['pharmacy']
        },
        boulangerie: {
            type: 'shop',
            attributes: ['bakery']
        },
        supermarche: {
            type: 'shop',
            attributes: ['greengrocer', 'supermaket', 'mall']
        },
        medecin: {
            type: 'amenity',
            attributes: ['clinic', 'doctors', 'hospital']
        },
        arret_bus: {
            type: 'highway',
            attributes: ['bus_stop']
        },
        ecole: {
            type: 'amenity',
            attributes: ['kindergarten', 'college', 'school', 'university']
        },
        parc: {
            type: 'leisure',
            attributes: ['garden', 'park']
        },
        lieu_de_culte: {
            type: 'amenity',
            attributes: ['place_of_worship']
        },
        // LES SECONDAIRES
        coiffeur:{
            type: 'shop',
            attributes: ['hairdresser']
        },
        musee:{
            type: 'tourism',
            attributes: ['museum']
        },
        bibliotheque:{
            type: 'amenity',
            attributes: ['library']
        },
        salle_de_sport:{
            type: 'leisure',
            attributes: ['fitness_centre', 'sports_centre', 'fitness_station']
        },
    }

    // FILTRES
    // TYPE = NODE

    // PROBLEMES A GERER
    // WAY POUR LES SPORTS CENTRE

    // FONCTION QUI RETRIEVE TOUT

    return elements;
};

function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

module.exports.all_positions = all_positions;