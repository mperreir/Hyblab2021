'user strict';
const fetch = require('node-fetch');

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
                    return `An error has occured with the input ${filtre} concerning ${arg}`
                }
            case "type":
            case "time":
            case "weather":
            case "sea":
                if (input[filtre].includes(arg)) {
                    filtres[filtre] = arg;
                    break;
                } else {
                    return `An error has occured with the input ${filtre} concerning ${arg}`
                }
            case "planning":
                filtres.planning = [];
                for (const elem of arg.split(',')) {
                    
                    const choice = elem.split('(')
                    const value = choice[0];
                    const dist = choice[1].slice(0, -1);

                    if (!input.planning.includes(value)) {
                        return `An error has occured with the input planning concerning ${value}`
                    } else if (!/^\d+$/.test(dist)) {
                        return `An error has occured with the input planning concerning the distance of ${value}`
                    } else {
                        filtres.planning.push(value);
                        filtres[`dist_${value}`] = dist;
                    }
                }
                break;
            default:
                return `An error has occured with the input: ${filtre}, I don't know what this is !`
        }
    }

    const osm = require("./openstreetmap");
    const utils = require("./utils");

    // Create the url to fetch with criterias
    const url = osm.api_url(filtres);

    // Fetching
    const res = await osm.api_fetch(url);
    
    if (!res.ok) {
        return `An error has occured (${res.status}) when fetching on the openstreetmap api.`;
    }

    const data_map = await res.json();

    // Sort the node
    let [beaches, harbors, lighthouses, car_parks] = osm.sort_node(data_map.elements);

    if (beaches.length == 0) {
        return `There is no beaches respecting the planning around and the location.`;
    }

    // Filter the beaches with the type of the surface of it
    if (filtres.hasOwnProperty("type")) {
        beaches = osm.filter_type(beaches, filtres);
    }

    if (beaches.length == 0) {
        console.log(`There is no beaches respecting the planning around, the location and the type.`);
        return [];
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
    const ow = require("./openweather");

    let data_weather = await ow.api_fetch(plages);

    //if there has been an error
    if (typeof data_weather == "string") {
        return data_weather
    }

    // Format data of the weather
    let weather = ow.format(data_weather)

    // Filter plages with time
    if (filtres.hasOwnProperty("time")) {
        weather = ow.filter_time(weather, filtres)
    }

    return weather

    // if (filtres.hasOwnProperty("weather") || filtres.hasOwnProperty("time") || filtres.hasOwnProperty("sea")) {

        

    //         const data_weather = await response_weather.json();

            

    //         return data_weather;
    //         console.log(data_weather);

    //         const unix_sunrise = data_weather.sys.sunrise;
    //         const unix_sunset = data_weather.sys.sunset;
    //         const unix_actualTime = data_weather.dt;

    //         function time(unix) {
    //             let time = new Date(unix * 1000);
    //             let hours = time.getHours();
    //             let minutes = "0" + time.getMinutes();
    //             let seconds = "0" + time.getSeconds();
    //             return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    //         }


    //         node.weather = {
    //             sky: data_weather.weather[0].main,
    //             temp: data_weather.main.temp -273.15, // From Kelvin to Celcius
    //             wind: data_weather.wind.speed,
    //         };

    //         
    //     }
    // }

    // filter
    if (filtres.hasOwnProperty("weather")) {
        if (filtres.weather === "stormy") {
            plages = plages.filter(node => ["Thunderstorm", "Ash", "Squall", "Tornado", "Sand"].includes(node.weather.sky))
        }
        if (filtres.weather === "clear") {
            plages = plages.filter(node => ["Clear"].includes(node.weather.sky))
        }
        if (filtres.weather === "bad") {
            plages = plages.filter(node => ["Rain", "Drizzle", "Fog",  "Smoke", "Snow", "Dust"].includes(node.weather.sky))
        }
        if (filtres.weather === "cloudy") {
            plages = plages.filter(node => ["Haze", "Mist", "Clouds"].includes(node.weather.sky))
        }
    }

    // Take the 3 nodes nearest of the initial location
    return utils.filter(plages, filters, 3)
};

