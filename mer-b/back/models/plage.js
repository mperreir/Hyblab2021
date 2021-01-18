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
    plage = {
        latitude: 47.6175568,
        longitude: -3.1848329,
        name: null,
        type: "sand",
        naturisme: false
    } 

    return filtres
};
