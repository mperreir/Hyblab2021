'user strict';
const error = require("./error");

exports.filtres = (req) => {
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
                    } else if (choice.length == 1 || !/^\d+$/.test(choice[1].slice(0, -1))) {
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

    if (!filtres.hasOwnProperty("longitude") || !filtres.hasOwnProperty("latitude")) {
        return error.e400(`An error has occured with the input: `
        +`you need to specify the ${(filtres.hasOwnProperty("longitude")?"latitude":"longitude")}`);
    }

    return {ok: true, data:filtres}
}

function dist (lat1, lon1, lat2, lon2) {
        return (lat1-lat2)**2 + (lon1-lon2)**2
}
exports.dist;

exports.nearest = (plage, object) => {
    let nearest = object[0];
    for (const node in object) {
        if (dist(plage.latitude, plage.longitude, node.latitude, node.longitude) < nearest) {
            nearest = node;
        }
    }
    return nearest;
}

exports.filter = (plages, filtres, n) => {
    plages.sort((a, b) => dist(a.latitude, a.longitude, filtres.latitude, filtres.longitude) - dist(b.latitude, b.longitude, filtres.latitude, filtres.longitude));
    return plages.slice(0, n)
}

