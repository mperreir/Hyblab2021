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

    let arc = 9000/(6371*Math.PI);

    let latTop = filtres.latitude + arc;
    let latBot = filtres.latitude - arc;
    let longLeft = filtres.longitude + arc;
    let longRight = filtres.longitude - arc;

    const ask = `?data=%5Bout%3Ajson%5D%5Bbbox%3A${latBot}%2C${longLeft}%2C${latTop}%2C${longRight}%5D%3B%0D%0A%28%0D%0A++area%5Bname%3D%22France%22%5D%3B%0D%0A++node%28area%29%5B%22natural%22%3D%22beach%22%5D%3B%0D%0A%29%3B%0D%0Aout%3B&target=compact`;
    const cst = require("../constants/openstreetmap")

    async function getbeaches() {
        let response = await fetch(cst.api_url1+ask);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        let data = await response.json()
        return data;
    }
    getbeaches().then(data => {
        
        console.log(data)

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

