'user strict';
const fetch = require('node-fetch');

exports.getbyfilter = async function(req) {

    let filtres = {};
    let dist_lighthouse = ``;
    let dist_harbor= ``;
    let dist_car = ``;

    const liste_filtres = req.split('&');
    for (const e of liste_filtres) {
        const [filtre, arg] = e.split('=');

        switch (filtre) {
            case "latitude":
                if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(arg)) {
                    filtres.latitude = parseFloat(arg);
                    break;
                } else {
                    return `An error has occured with the input latitude: ${arg},
                    the argument need to be a float.`
                }
            case "longitude":
                if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(arg)) {
                    filtres.longitude = parseFloat(arg);
                    break;
                } else {
                    return `An error has occured with the input longitude: ${arg},
                    the argument need to be a float.`
                }
            case "type":
                if (["sand", "pebble", "rocks"].includes(arg)) {
                    filtres.type = arg;
                    break;
                } else {
                    return `An error has occured with the input type: ${arg},
                    the argument  need to be sand, pebble or rocks.`
                }
            case "time":
                if (["sunrise", "sunset", "day", "night", "full_moon", "new_moon", "crescent"].includes(arg)) {
                    filtres.time = arg;
                    break;
                } else {
                    return `An error has occured with the input time: ${arg},
                    the argument need to be sunrise, sunset, day, night, full_moon, new_moon or crescent.`
                }
            case "weather":
                if (["clear", "cloudy", "bad", "stormy"].includes(arg)) {
                    filtres.weather = arg;
                    break;
                } else {
                    return `An error has occured with the input weather: ${arg},
                    the argument need to be clear, cloudy, bad or stormy.`
                }
            case "sea":
                if (["hectic", "calm"].includes(arg)) {
                    filtres.sea = arg;
                    break;
                } else {
                    return `An error has occured with the input sea: ${arg},
                    the argument need to be hectic or calm.`
                }
            case "planning":
                const plannings = arg.split(',')
                for (const elem of plannings) {
                    
                    const choice = elem.split('(')
                    const value = choice[0];
                    const dist = choice[1].slice(0, -1);

                    if (!["harbor", "lighthouse", "car_park"].includes(value)) {
                        return `An error has occured with the input planning: ${arg} concerning the ${value},
                        the argument need to be harbor, lighthouse or car_park.`
                    } else if (!/^\d+$/.test(dist)) {
                        return `An error has occured with the input planning: ${arg} concerning the distance of ${value} it need to be an int.`
                    } else {
                        filtres.planning = value;
                        if (value == "harbor") dist_harbor = dist;
                        else if(value == "lighthouse") dist_lighthouse = dist;
                        else dist_car = dist;
                    }
                }
                break;
            default:
                return `An error has occured with the input: ${filtre}, I don't know what this is !`
        }
    }

    // angle representing 50 km on the earth's surface
    // d = 2 * pi * r * a / 360, so a is equal to :
    const arc = 360 * 50/(2 * 6371 * Math.PI);

    const prefix = `?data=%5Bout%3Ajson%5D`; // [out:json]
    const bbox = `%5Bbbox%3A${filtres.latitude - arc}%2C${filtres.longitude - arc}%2C${filtres.latitude + arc}%2C${filtres.longitude + arc}%5D%3B%0D`; // [bbox:_,_,_,_];
    const france = `%0A%0D%0Aarea%5Bname%3D%22France%22%5D%3B%0D`; // area["name"="France"];
    
    const ask_lighthouse = `%0A%0D%0A%28node%5B%22man_made%22%3D%22lighthouse%22%5D%28area%29%3Bnode%5B%22man_made%22%3D%22beacon%22%5D%28area%29%3B%29-%3E.lighthouse%3B%0D`; // (node["man_made"="lighthouse"](area);node["man_made"="beacon"](area);)->.lighthouse;
    const ask_harbor = `%0A%0D%0Anode%28area%29%5B%22harbor%22%3D%22yes%22%5D%5B%22seamark%3Atype%22%3D%22harbour%22%5D-%3E.harbor%3B%0D`; // node["harbour"="yes"]["seamark:type"="harbour"](area)->.harbor;
    const ask_car = `%0A%0D%0Anode%28area%29%5B%22amenity%22%3D%22parking%22%5D-%3E.parking%3B%0D`; // node["amenity"="parking"](area)->.carpark;
    
    const pre_ask = `%0A%0D%0Anode`; // node
    const with_nothing = `%28area%29`; // (area)
    const with_lighthouse = `%28around.lighthouse%3A${dist_lighthouse}%29`; // (around.lighthouse:10000)
    const with_harbor = `%28around.harbor%3A${dist_harbor}%29`; // (around.harbor:10000)
    const with_car = `%28around.carpark%3A${dist_car}%29`; // (around.harbor:10000)
    const ask = `%5B%22natural%22%3D%22beach%22%5D-%3E.beaches%3B%0D`; // ["natural"="beach"]->.beaches;

    const prefix_output = `%0A++%0D%0A%28.beaches`; // (.beaches
    const separator_output = `%3B+`; // ;
    const out_lighthouse = `.lighthouse`; // .lighthouse
    const out_harbor = `.harbor`; // .harbor
    const out_car = `.parking`; // .parking
    const sufix_output = `%3B%29%3B%0D`; // ;);

    const sufix = `%0Aout%3B&target=compact`; // out;

    const cst = require("./constants/openstreetmap");

    if (!filtres.hasOwnProperty("planning")) {
        var url = prefix + bbox + france + pre_ask + with_nothing + ask + prefix_output + sufix_output + sufix;
    } else {
        const harbor = filtres.planning.includes("harbor");
        const lighthouse = filtres.planning.includes("lighthouse");
        const car = filtres.planning.includes("car_park");

        var url = prefix + bbox + france + (harbor ? ask_harbor : ``) + (lighthouse ? ask_lighthouse : ``) + (car ? ask_car : ``) + pre_ask + (harbor ? with_harbor : ``) + (lighthouse ? with_lighthouse : ``) + (car ? with_car : ``) + ask + prefix_output + (harbor ? separator_output + out_harbor : ``) + (lighthouse ? separator_output + out_lighthouse : ``) + (car ? separator_output + out_car : ``) + sufix_output + sufix;
    }

    let response = await fetch(cst.api_url1 + url);

    if (!response.ok) {
        return `An error has occured (${response.status}) when fetching on the openstreetmap api.`;
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

    if (beaches.length == 0) {
        console.log(`There is no beaches respecting the planning around and the location.`);
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

    if (beaches.length == 0) {
        console.log(`There is no beaches respecting the planning around, the location and the type.`);
    }

    function dist(lat1, lon1, lat2, lon2) {
        return (lat1-lat2)**2 + (lon1-lon2)**2
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

