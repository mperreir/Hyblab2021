'user strict';
const error = require("./error");
const utils = require("./utils");
const osm = require("./openstreetmap");
const ow = require("./openweather");

exports.getbyfilter = async function(req) {

    // Create filtres from req
    let filtres = utils.filtres(req)

    //if there has been an error
    if (!filtres.ok) {
        return filtres;
    } else {
        filtres = filtres.data;
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

    // filter 30 plages (limitation by openweathermap for 1 minute (/2 if we want 2 request by minute))
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
