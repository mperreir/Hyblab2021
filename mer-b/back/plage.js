'user strict';
const error = require("./error");
const utils = require("./utils");
const osm = require("./openstreetmap");
const ow = require("./openweather");

exports.getbyfilter = async function(req) {

    const input = {
        type: ["sand", "pebble", "rocks"],
        time: ["dawn", "day", "dusk", "night"],
        weather: ["clear", "cloudy", "bad", "stormy"],
        sea: ["hectic", "calm"],
        planning: ["harbor", "lighthouse", "car_park"]
    }

    let filtres = {};

    const liste_filtres = req.split('&');
    for (const e of liste_filtres) {
        const [filtre, arg] = e.split('=');

        switch (filtre) {
            case "latitude":
            case "longitude":
                if (/^(-?\d+(\.\d+)?).\s*(-?\d+(\.\d+)?)$/.test(arg)) {
                    filtres[filtre] = parseFloat(arg);
                    break;
                } else {
                    return error.e400(`An error has occured with the input ${filtre} concerning ${arg}`);
                }
            case "type":
            case "time":
            case "weather":
            case "sea":
                if (input[filtre].includes(arg)) {
                    filtres[filtre] = arg;
                    break;
                } else {
                    return error.e400(`An error has occured with the input ${filtre} concerning ${arg}`);
                }
            case "planning":
                filtres.planning = [];
                for (const elem of arg.split(',')) {
                    const choice = elem.split('(')

                    if (!input.planning.includes(choice[0])) {
                        return error.e400(`An error has occured with the input planning concerning ${choice[0]}`);
                    } else if (choice == 1 || !/^\d+$/.test(choice[1].slice(0, -1))) {
                        return error.e400(`An error has occured with the input planning concerning the distance of ${choice[0]}`);
                    } else {
                        filtres.planning.push(choice[0]);
                        filtres[`dist_${choice[0]}`] = choice[1].slice(0, -1);
                    }
                }
                break;
            default:
                return error.e400(`An error has occured with the input: ${filtre}`);
        }
    }

    // Create the url to fetch with criterias
    const url = osm.api_url(filtres);

    // Fetching
    const res = await osm.api_fetch(url);
    
    if (!res.ok) {
        return error.e(res.status, `An error has occured when fetching on the openstreetmap api.`);
    }

    const data_map = await res.json();

    // Sort the node
    let [beaches, harbors, lighthouses, car_parks] = osm.sort_node(data_map.elements);

    if (beaches.length == 0) {
        return  error.e204(`Criterias: location + planning`);
    }

    // Filter the beaches with the type of the surface of it
    if (filtres.hasOwnProperty("type")) {
        beaches = osm.filter_type(beaches, filtres);
    }

    if (beaches.length == 0) {
        return  error.e204(`Criterias: location + planning + type`);
    }

    // format the beaches information into plages
    let plages = osm.format(beaches);

    // add more information about plannings if needed
    if (harbors.length !== 0) {
        plages = osm.addlighthouses(plages, harbors);
    }
    if (lighthouses.length !== 0) {
        plages = osm.addlighthouses(plages, lighthouses);
    }
    if (car_parks.length !== 0) {
        plages = osm.addcar_parks(plages, car_parks);
    }

    // filter 30 plages (limitation by openweathermap for 1 minute (/2 if we want 2 request by minute): https://openweathermap.org/price)
    plages = utils.filter(plages, filtres, 30);

    // fetching the weather for each beach
    let data_weather = await ow.api_fetch(plages);

    //if there has been an error
    if (!data_weather.ok) {
        return data_weather
    }

    // Format data of the weather
    let weather = ow.format(data_weather.data)

    // Filter weather with time
    if (filtres.hasOwnProperty("time")) {
        weather = ow.filter_time(weather, filtres)
    } else {
        weather = ow.format_time(weather)
    }

    // Filter weather with type of weather
    if (filtres.hasOwnProperty("weather")) {
        plages, weather = ow.filter_weather(plages, weather, filtres)
    }

    if (beaches.length == 0) {
        return error.e204(`Criterias: location + planning + type + weather`);
    }

    // Filter weather with type of sea
    if (filtres.hasOwnProperty("sea")) {
        plages, weather = ow.filter_sea(plages, weather, filtres)
    }

    if (beaches.length == 0) {
        return error.e204(`Criterias: location + planning + type + weather + sea`);
    }

    // Take the 3 nodes nearest of the initial location
    plages = utils.filter(plages, filtres, 3)

    // Choose a good time to go
    plages = ow.choose(plages, weather)

    return {
        ok: true,
        status: 200,
        descritption: `All things done succesfully`,
        output: plages
    };
};
