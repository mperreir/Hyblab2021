'user strict';

/**
 * streetmap output :
 * - type : surface : ["sand", "sable", "gravel", "ground", "asphalt", "grass",
 *                     "pebblestone",  "shingle", "shingles", "fine_gravel",
 *                     "sable_et_gallet", "stone"]
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
            case "latitude":  filtres.latitude = parseFloat(arg);
            case "longitude":  filtres.longitude = parseFloat(arg);
            case "type": filtres.type = arg;
            case "time": filtres.time = arg;
            case "weather": filtres.weather = arg;
            case "tide": filtres.tide = arg;
            case "sea": filtres.sea = arg;
            case "planning": filtres.planning = arg.split(',');
        }
    }

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
