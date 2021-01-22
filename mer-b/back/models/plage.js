'user strict';
const fetch = require('node-fetch');

exports.getbyfilter = async function(req) {

    let filtres = {};

    const liste_filtres = req.split('&');
    for (const e of liste_filtres) {
        const [filtre, arg] = e.split('=');

        switch (filtre) {
            case "latitude": filtres.latitude = parseFloat(arg);
            break;
            case "longitude":  filtres.longitude = parseFloat(arg);
            break;
            case "type": filtres.type = arg;
            break;
            case "time": filtres.time = arg;
            break;
            case "weather": filtres.weather = arg;
            break;
            case "sea": filtres.sea = arg;
            break;
            case "planning": filtres.planning = arg.split(',');
            break;
        }
    }

    /**
     * longueur arc de cercle = (Pi * Rayon * Angle) / 180 car 2 * Pi * Rayon correspond à 360° (proportionnalité)
     * Angle = latitude1 - latitude2 ou longitude 1 - longitude 2
     * Nos données : - longueur arc de cercle = 50 km
     *               - rayon de la Terre = 6371 km
     *               - latitude et longitude de l'utilisateur
     */

    const arc = 9000/(6371*Math.PI);

    const prefix = `?data=%5Bout%3Ajson%5D`; // [out:json]
    const bbox = `%5Bbbox%3A${filtres.latitude - arc}%2C${filtres.longitude - arc}%2C${filtres.latitude + arc}%2C${filtres.longitude + arc}%5D%3B%0D`; // [bbox:_,_,_,_];
    const france = `%0A%0D%0Aarea%5Bname%3D%22France%22%5D%3B%0D`; // area["name"="France"];
    
    const ask_lighthouse = `%0A%0D%0A%28node%5B%22man_made%22%3D%22lighthouse%22%5D%28area%29%3Bnode%5B%22man_made%22%3D%22beacon%22%5D%28area%29%3B%29-%3E.lighthouse%3B%0D`; // (node["man_made"="lighthouse"](area);node["man_made"="beacon"](area);)->.lighthouse;
    const ask_harbor = `%0A%0D%0Anode%28area%29%5B%22harbor%22%3D%22yes%22%5D%5B%22seamark%3Atype%22%3D%22harbour%22%5D-%3E.harbor%3B%0D`; // node["harbour"="yes"]["seamark:type"="harbour"](area)->.harbor;
    const ask_car = `%0A%0D%0Anode%28area%29%5B%22amenity%22%3D%22parking%22%5D-%3E.parking%3B%0D`; // node["amenity"="parking"](area)->.carpark;
    
    const pre_ask = `%0A%0D%0Anode`; // node
    const with_nothing = `%28area%29`; // (area)
    const dist_lighthouse = `1000`;
    const with_lighthouse = `%28around.lighthouse%3A${dist_lighthouse}%29`; // (around.lighthouse:10000)
    const dist_harbor= `1000`;
    const with_harbor = `%28around.harbor%3A${dist_harbor}%29`; // (around.harbor:10000)
    const dist_car = `500`;
    const with_car = `%28around.carpark%3A${dist_car}%29`; // (around.harbor:10000)
    const ask = `%5B%22natural%22%3D%22beach%22%5D-%3E.beaches%3B%0D`; // ["natural"="beach"]->.beaches;

    const prefix_output = `%0A++%0D%0A%28.beaches`; // (.beaches
    const separator_output = `%3B+`; // ;
    const out_lighthouse = `.lighthouse`; // .lighthouse
    const out_harbor = `.harbor`; // .harbor
    const out_car = `.parking`; // .parking
    const sufix_output = `%3B%29%3B%0D`; // ;);

    const sufix = `%0Aout%3B&target=compact`; // out;

    const cst = require("../constants/openstreetmap");

    if (!filtres.hasOwnProperty("planning")) {
        var url = cst.api_url1 + prefix + bbox + france + pre_ask + with_nothing + ask + prefix_output + sufix_output + sufix;
    } else {
        const harbor = filtres.planning.includes("harbor");
        const lighthouse = filtres.planning.includes("lighthouse");
        const car = filtres.planning.includes("car_park");

        var url = cst.api_url1 + prefix + bbox + france + (harbor ? ask_harbor : ``) + (lighthouse ? ask_lighthouse : ``) + (car ? ask_car : ``) + pre_ask + (harbor ? with_harbor : ``) + (lighthouse ? with_lighthouse : ``) + (car ? with_car : ``) + ask + prefix_output + (harbor ? separator_output + out_harbor : ``) + (lighthouse ? separator_output + out_lighthouse : ``) + (car ? separator_output + out_car : ``) + sufix_output + sufix;
    }

    let response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    let data = await response.json()

    let beaches = [];
    let harbors = [];
    let lighthouses = [];
    let car_parks = [];

    // Sort the node
    for (const node of data.elements) {
        if (node.tags.hasOwnProperty("natural") && node.tags.natural == "beach") {
            beaches.push(node)
        } else if (node.tags.hasOwnProperty("harbour") && node.tags.harbour == "yes") {
            harbors.push(node)
        } else if (node.tags.hasOwnProperty("amenity") && node.tags.amenity == "parking") {
            car_parks.push(node)
        } else if (node.tags.hasOwnProperty("man_made") && (node.tags.man_made == "lighthouse" || node.tags.man_made == "beacon")) {
            lighthouses.push(node)
        }
    }

    // Filter the beaches with the type of the surface of it
    if (filtres.hasOwnProperty("type")) {
        beaches = beaches.filter(node => !node.tags.hasOwnProperty(surface))
        if (filtres.type = "sand") {
            beaches = beaches.filter(node => !["sand", "sable", "sable_et_gallet", "dirt/sand"].includes(node.tags.surface))
        } else if (filtres.type = "pebble") {
            beaches = beaches.filter(node => !["pebblestone", "sable_et_gallet", "shingle", "shingles", "dirt/sand"].includes(node.tags.surface))
        } else if (filtres.type = "rocks") {
            beaches = beaches.filter(node => !["gravel", "asphalt", "fine_gravel", "stone"].includes(node.tags.surface))
        }
    }

    // Take the 3 nodes nearest of the initial location
    if (beaches.length > 3 ) {
        let min1 = Infinity;
        let min2 = Infinity;
        let min3 = Infinity;

        beaches_clone = Array.from(beaches)
        beaches_clone.forEach(function (node, index) {
            let dist = dist(node.lat, node.lon, filtres.latitude, filtres.longitude);
            if (dist < min1) {
                min3 = min2;
                min2 = min1;
                min1 = dist;
            } else if (dist < min2) {
                min3 = min2;
                min2 = dist;
            } else if (dist < min3) {
                min3 = dist;
            } else {
                beaches.splice(index - (beaches_clone.length - beaches.length), 1);
            }
        })
    }

    var plages = [];
    for (const node of beaches) {
        plages.push({
            latitude: node.lat,
            longitude: node.lon,
            name: (node.tags.hasOwnProperty("name") ? node.tags.name : null),
            type: (node.tags.hasOwnProperty("surface") ? node.tags.surface : null)
        });
    }

    return plages
};

function dist(lat1, lon1, lat2, lon2) {
    return (lat1-lat2)**2 + (lon1-lon2)**2
}
