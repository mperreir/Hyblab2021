'use strict';

const fetch = require('node-fetch');
const { request, map } = require('./server');

async function all_positions(list_criteres, persona, longitude, latitude){
    const vitesses = {
        young: 5.5,  // average speed / one quarter
        family: 5,
        old: 3
    };
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
            "range": [vitesses[persona] / 4 * 1000],
            "range_type": "distance",
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
    
    let HttpProxyAgent = require( 'http-proxy-agent' );
    let options = {
        agent: new HttpProxyAgent( 'http://cache.ha.univ-nantes.fr:3128' ),
    };
    
    console.log(longitude, latitude);
    console.log(minLat, minLon, maxLat, maxLon);
    let request = `[out:json];
    (
    node[shop~"bakery|greengrocer|supermaket|mall|hairdresser"](${minLat},${minLon},${maxLat},${maxLon});
    node[amenity~"pharmacy|clinic|doctors|hospital|bus_station|kindergarten college|school|university|library|place_of_worship"](${minLat},${minLon},${maxLat},${maxLon});
    node[leisure~"fitness_centre|sports_centre|fitness_station"](${minLat},${minLon},${maxLat},${maxLon});
    node[tourism~"museum"](${minLat},${minLon},${maxLat},${maxLon});
    node[highway~"bus_stop"](${minLat},${minLon},${maxLat},${maxLon});
    );
    out;`;
    request = await fetch("http://overpass-api.de/api/interpreter?data="+request);
    request = await request.json();
    
    let response = request;
    console.log("nb elements dans le carré : ", response.elements.length);
    let elements = response.elements.filter(el => inside([el.lon, el.lat], a));
    console.log("nb elements dans le polygone : ", elements.length);

    // Mention honorable : AMNITY bar 	cafe fast_food restaurant

    // Pharmacie  AMNITY pharmacy
    // Boulangerie  SHOP  bakery
    // Supermarché  SHOP greengrocer supermarket mall
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
        'Pharmacie': {
            type: 'amenity',
            attributes: ['pharmacy']
        },
        'Boulangerie': {
            type: 'shop',
            attributes: ['bakery']
        },
        'Supermarché': {
            type: 'shop',
            attributes: ['greengrocer', 'supermaket', 'mall']
        },
        'Médecin': {
            type: 'amenity',
            attributes: ['clinic', 'doctors', 'hospital']
        },
        'Ecole': {
            type: 'amenity',
            attributes: ['kindergarten', 'college', 'school', 'university']
        },
        'Lieu de culte': {
            type: 'amenity',
            attributes: ['place_of_worship']
        },
        // LES SECONDAIRES
        'Coiffeur':{
            type: 'shop',
            attributes: ['hairdresser']
        },
        'Musee':{
            type: 'tourism',
            attributes: ['museum']
        },
        'Bibliotheque':{
            type: 'amenity',
            attributes: ['library']
        },
        'Salle de sport':{
            type: 'leisure',
            attributes: ['fitness_centre', 'sports_centre', 'fitness_station']
        },
    }

    // FILTRES
    // TYPE = NODE

    // PROBLEMES A GERER
    // WAY POUR LES SPORTS CENTRE

    // FONCTION QUI RETRIEVE TOUT
    let res = [];
    list_criteres.forEach(crit => {
        config[crit] !== undefined && res.push(
        {
            'categorie': crit,
            'data': elements.filter(el => {
                    return el.type === 'node' 
                    && config[crit].attributes.includes(el.tags[config[crit].type]);
                })
        });
    });
    // Ajout des parcs
    if(list_criteres.includes('Parc')) res.push({categorie: 'Parc', data: await api_parc(a)});
    if(list_criteres.includes('Arrêt de bus')) res.push({categorie: 'Arrêt de bus', data: await api_bus(a)});
    
    // calculer les distances
    for(let cat_obj of res) {
        for(let poi of cat_obj.data) {
            poi.temps = await temps_de_trajet(poi.lon, poi.lat, longitude, latitude, vitesses[persona]);
        }
    }

    res = res.map(cat_obj => {
        return {
            categorie: cat_obj.categorie,
            data: cat_obj.data.map(node => {
                return {
                    temps: node.temps,
                    nom: node.tags.name,
                    adresse: node.tags['addr:street'] ? 
                        node.tags['addr:housenumber'] + ' ' + node.tags['addr:street'] + ' ' + node.tags['addr:postcode'] + ' ' + node.tags['addr:city'] 
                    : 
                        ''
                }
            })
        }
    });

    // Trier les résultats par temps
    res.forEach(cat_obj => {
        cat_obj.data.sort((node1, node2) => {
            if (node1.temps > node2.temps) return 1;
            if (node1.temps < node2.temps) return -1;
            return 0;
        });
    });

    // Limiter à 10
    res = res.map(cat_obj => {
        return {categorie: cat_obj.categorie, data: cat_obj.data.slice(0, 10)}
    });
    
    return res;
};

async function temps_de_trajet(lon1, lat1, lon2, lat2, vitesse) {
    const rayon_terre = 6378;
    const distance = rayon_terre * Math.acos(Math.sin(dtr(lat1)) * Math.sin(dtr(lat2)) + Math.cos(dtr(lat1)) * Math.cos(dtr(lat2)) * Math.cos(dtr(lon2)-dtr(lon1)));
    const temps = Math.round(distance / vitesse * 60);
    return temps < 0 ? 1 : temps;
}

// degree to radian
function dtr(degrees) {
  return degrees * (Math.PI/180);
}

async function api_parc(polygon) {
    let geo_polygon = "";
    polygon.forEach(point => {
        geo_polygon += "(" + point[1] + "," + point[0] + "),";
    })
    geo_polygon = geo_polygon.slice(0, -1);
    const lien = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parcs-jardins-nantes&q=&rows=1000&geofilter.polygon=" + geo_polygon;
    const response = await fetch(lien);
    const resultAPI = await response.json();
    const data = [];
    resultAPI.records.forEach(result => {
        const parc = {}
        parc.tags = {};
        parc.tags.name = result.fields.nom_complet;
        parc.lat = result.fields.location[0];
        parc.lon = result.fields.location[1];
        data.push(parc);
    });
    return data;
}

async function api_bus(polygon) {
    let geo_polygon = "";
    polygon.forEach(point => {
        geo_polygon += "(" + point[1] + "," + point[0] + "),";
    })
    geo_polygon = geo_polygon.slice(0, -1);
    const lien = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets&q=&rows=1000&location_type=1&geofilter.polygon=" + geo_polygon;
    const response = await fetch(lien);
    const resultAPI = await response.json();
    const arrets = [];
    resultAPI.records.forEach(result => {
        const arret = {};
        arret.tags = { "name": result.fields.stop_name };
        arret.lat = result.fields.stop_coordinates[0];
        arret.lon = result.fields.stop_coordinates[1];
        arrets.push(arret);
    });
    return arrets;
}

function inside(point, polygon) {
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        var xi = polygon[i][0], yi = polygon[i][1];
        var xj = polygon[j][0], yj = polygon[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

module.exports.all_positions = all_positions;

function retourner(poly) {
    const res = []
    poly.forEach(point => res.push([point[1], point[0]]));
    return res;
}