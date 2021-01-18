'user strict';

/*
/ Plage
/
/ latitude : float
/ longitude : float
/ name : sting
/ type : string
/ naturisme : bool
/ 
/ streetmap output :
/ type : surface : ["sand", "sable", "gravel", "ground", "asphalt", "grass",
          "pebblestone",  "shingle", "shingles", "fine_gravel",
          "sable_et_gallet", "stone"] -> ?
/ naturisme : nudism : yes/permissive/-/customary/obligatory/designated
              or naturism : yes/-
/ - : wheelchair : limited, yes, -, no
/ - : possible information via : website/wikipedia/Wikidata
*/

exports.getbyfilter = function(req) {

    let filtres = {
        latitude: null,
        longitude: null,
        type: null
    };

    const liste_filtres = req.split('&');
    for (const e of liste_filtres) {
        const [filtre, arg] = e.split('=');

        switch (filtre) {
            case "lat":  filtres.latitude = arg;
            case "lon":  filtres.longitude = arg;
            case "type": filtres.type = arg;
        }
    }

    // will be replaced by am API call
    plage = {
        latitude: 47.6175568,
        longitude: -3.1848329,
        name: null,
        type: "sand",
        naturisme: false,
        info: `${Object.keys(filtres).length}`
    } 

    return plage
};
