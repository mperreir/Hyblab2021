'user strict';
const fetch = require('node-fetch');

exports.getbyfilter = async function(req) {

    const type = ["sand", "pebble", "rocks"];
    const time = ["dawn", "day", "dusk", "night"];
    const weather = ["clear", "cloudy", "bad", "stormy"];
    const sea = ["hectic", "calm"];
    const planning = ["harbor", "lighthouse", "car_park"];

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
                if ([filtre].includes(arg)) {
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

                    if (!planning.includes(value)) {
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

    const url = osm.api_url(filtres);
    const res = osm.api_fetch(url)
    
    if (!res.ok) {
        return `An error has occured (${res.status}) when fetching on the openstreetmap api.`;
    }

    const data = await res.json();

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
        return [];
    }

    // Filter the beaches with the type of the surface of it
    if (filtres.hasOwnProperty("type")) {
        beaches = beaches.filter(node => !node.tags.hasOwnProperty(surface))
        if (filtres.type = "sand") {
            beaches = beaches.filter(node => ["sand", "sable", "sable_et_gallet", "dirt/sand"].includes(node.tags.surface))
        } else if (filtres.type = "pebble") {
            beaches = beaches.filter(node => ["pebblestone", "sable_et_gallet", "shingle", "shingles", "dirt/sand"].includes(node.tags.surface))
        } else if (filtres.type = "rocks") {
            beaches = beaches.filter(node => ["gravel", "asphalt", "fine_gravel", "stone"].includes(node.tags.surface))
        }
    }

    if (beaches.length == 0) {
        console.log(`There is no beaches respecting the planning around, the location and the type.`);
        return [];
    }

    // format the beaches information into plages
    let plages = [];
    for (const node of beaches) {
        plages.push({
            latitude: node.lat,
            longitude: node.lon,
            nom: (node.tags.hasOwnProperty("name") ? node.tags.name : null),
            type: (node.tags.hasOwnProperty("surface") ? node.tags.surface : null)
        });
    }
    
    // add more information about plannings if needed
    function nearest(plage, object) {
        let nearest = object[0];
        for (const node in object) {
            if ((plage.latitude - node.latitude)**2 + (plage.longitude - node.longitude)**2 > nearest) {
                nearest = node;
            }
        }
        return nearest;
    }

    if (harbors.length !== 0) {
        for (const node of plages) {
            const harbor = nearest(node, harbors);
            node.port = {
                latitude: harbor.lat,
                longitude: harbor.lon,
                name: (harbor.tags.hasOwnProperty("name") ? harbor.tags.name : null),
            }
        }
    }

    if (lighthouses.length !== 0) {
        for (const node of plages) {
            const lighthouse = nearest(node, lighthouses);
            node.phare = {
                latitude: lighthouse.lat,
                longitude: lighthouse.lon,
                name: (lighthouse.tags.hasOwnProperty("name") ? lighthouse.tags.name : null),
            }
        }
    }

    if (car_parks.length !== 0) {
        for (const node of plages) {
            const car_park = nearest(node, car_parks);
            node.parking = {
                latitude: car_park.lat,
                longitude: car_park.lon,
                name: (car_park.tags.hasOwnProperty("name") ? car_park.tags.name : null),
            }
        }
    }
    if (filtres.hasOwnProperty("weather") || filtres.hasOwnProperty("time") || filtres.hasOwnProperty("sea")) {

        const weather = require("./constants/openweathermap");



        for (const node of plages) {
            let lat = `lat=${node.latitude}&`
            let lon = `lon=${node.longitude}&`
            let key = `appid=${weather.key}`

            let response_weather = await fetch(weather.api_url + lat + lon + key);
            if (!response_weather.ok) {
                return `An error has occured (${response_weather.status}) when fetching on the openweathermap api.`;
            }

            let data_weather = await response_weather.json();

            const unix_sunrise = data_weather.sys.sunrise;
            const unix_sunset = data_weather.sys.sunset;
            const unix_actualTime = data_weather.dt;

            function time(unix) {
                let time = new Date(unix * 1000);
                let hours = time.getHours();
                let minutes = "0" + time.getMinutes();
                let seconds = "0" + time.getSeconds();
                return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            }


            node.weather = {};
            node.weather.sky = data_weather.weather[0].main;
            node.weather.temp = data_weather.main.temp -273.15;
            node.weather.wind =  data_weather.wind.speed;

            node.time = {};
            node.time.actualTime = time(unix_actualTime);
            node.time.aube = time(unix_sunrise - 3600); // 1 hour before sunrise is "aube"
            node.time.creneauAube = [time(unix_sunrise - 5400), time(unix_sunrise + 5400)];
            node.time.crepuscule = time(unix_sunset + 3600); // 1 hour after sunset is "crepuscule"
            node.time.creneauCrepuscule = [time(unix_sunset - 5400), time(unix_sunset + 5400)];
        }
    }

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

    /**aube, journée , crépuscule, nuit
     * ["dawn", "day", "dusk", "night"]
     */

    if (filtres.hasOwnProperty("time")) {
        console.log(plages);
        console.log(plages[0].time.actualTime > plages[0].time.creneauAube[0]);
        if (filtres.time === "dawn") {
            plages = plages.filter(node => (node.time.actualTime > node.time.creneauAube[0] && node.time.actualTime < node.time.creneauAube[1]));
        }
        if (filtres.time === "day") {
            plages = plages.filter(node => (node.time.actualTime > node.time.creneauAube[1] && node.time.actualTime < node.time.creneauCrepuscule[0]));

        }

        if (filtres.time === "dusk") {
            plages = plages.filter(node => (node.time.actualTime > node.time.creneauCrepuscule[0] && node.time.actualTime < node.time.creneauCrepuscule[1]));
        }

        if (filtres.time === "night") {
            plages = plages.filter(node => (node.time.actualTime < node.time.creneauAube[0] && node.time.actualTime > node.time.creneauCrepuscule[1]));
        }
    }

    // Take the 3 nodes nearest of the initial location
    if (plages.length > 3 ) {
        let min1 = Infinity;
        let min2 = Infinity;
        let min3 = Infinity;

        plages_clone = Array.from(plages)
        plages_clone.forEach(function (plage, index) {
            let dist = (plage.latitude - filtres.latitude)**2 + (plage.longitude - filtres.longitude)**2;
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
                plages.splice(index - (plages_clone.length - plages.length), 1);
            }
        })
    }

    return plages
};

