'user strict';
const fetch = require('node-fetch');

/**
 * streetmap output :
 * - type : surface : ["sand", "sable", "gravel", "ground", "asphalt", "grass",
 *                     "pebblestone",  "shingle", "shingles", "fine_gravel",
 *                     "sable_et_gallet", "stone", "s", "dirt/sand"]
 * - naturisme : - nudism : yes/permissive/-/customary/obligatory/designated
 *               - naturism : yes/-
 * - planning : - harbour : yes
 *              - man_made : lighthouse
 *              - amenity : parking
 * ? wheelchair : limited, yes, -, no
 * ? possible information via : website/wikipedia/Wikidata
 */

exports.getbyfilter = function(req) {

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



    async function getbeaches() {
        let response = await fetch(url);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        let data = await response.json()
        return data;
    }

    getbeaches().then(data => {

        let beaches = [];
        let harbors = [];
        let lighthouses = [];
        let car_parks = [];

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

    })

    // will be replaced by am API call
    plages = [
    {
        latitude: 47.7163386,
        longitude: -3.95997,
        name: "Pointe de Pen Maryse"
    },
    {
        latitude: 47.890907,
        longitude: -4.366774,
        name: "Plage Treguennec"
    },
    {
        latitude: 47.9703943,
        longitude: -4.4354322,
        name: null
    }
    ];

    return plages
};

