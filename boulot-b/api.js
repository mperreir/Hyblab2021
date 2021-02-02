// Use strict mode
'use strict';


//%%%%%%%%%%%%%%%%%%%%% Les fonctions utilitaires%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

let HttpsProxyAgent = require( 'https-proxy-agent' );

let options = {
    //agent: new HttpsProxyAgent( 'http://cache.ha.univ-nantes.fr:3128' ),
};

// fetch Asynchrone
const fetch = require('node-fetch');

 async function fetchAsync (url) {
    let response = await fetch(url, options);
    let data = await response.json();
    return data;
}

async function adresse2coord(adresse){
    let departSplit = adresse.split(' ')

    let departURI2 = 'https://api-adresse.data.gouv.fr/search/?q='

    departSplit.forEach(element => {
        departURI2 += element + '+'
    });

    let departData = fetchAsync(departURI2)
    let departAsync = await departData.then(res=>{
        return res})

    let coordonee = departAsync.features[0].geometry.coordinates;
/*     console.log('les coordonnes sont :');
    console.log(coordonee) */
    coordonee = coordonee.reverse()
    return coordonee;
}

/** une fonction qui retourn un random */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}



function getShortestExcursion(listPOIs){
    let index = getRandomInt(0, listPOIs.length);
    let minExcursionDistance = 1000;
    listPOIs.forEach(function(element,i){
        if (element.excursionDistance <= minExcursionDistance){
            minExcursionDistance = element.excursionDistance;
            index = i;
        }
    })
    return index;
}

/** ===================== ========================================== */
function getEquidistantPoint(x1,y1,x2,y2){
    let mx = (x1 + x2)/2;
    let my = (y1 + y2)/2;
    let pente = (y2-y1)/(x2-x1);
    let a = -1/pente; // a : pente de la médiatrice
    let b = my - (a * mx); 
    // y = a * x + b

    let aa = (a * a) + 1;
    let bb = (2 * a) * (b - my) - (2 * mx);
    let cc = ((b - my) * (b - my)) - 0.01 + (mx * mx);
    let delta = (bb * bb) - (4 * aa * cc);

    let x = (- bb + Math.sqrt(delta)) / (2 * aa)
    let y = Math.sqrt(0.01 - ((x - mx) * (x - mx))) + my;

    let coord = [x,y];
    return coord;
}
/** =============================================== */

/** renvoie la liste des points d'interets */
async function pointInteret(coordonneeD, coordoneeA, theme, transport){
  
/* debut */

    let depart = coordonneeD
    let arriver = coordoneeA



    let optimal = getEquidistantPoint(depart[0], depart[1], arriver[0], arriver[1])


/* fin */

    let milieu = [-1,-1]
    milieu[0] = (depart[0] + arriver[0])/2
    milieu[1] = (depart[1] + arriver[1])/2


/**
 * 0: -1.583788
1: 47.202481
 * 
 * 0: -1.577427
1: 47.2401
 */


    let routePolylineAPI = await fetchAsync(`https://router.hereapi.com/v8/routes?alternatives=0&origin=${depart[0]},${depart[1]}&transportMode=${transport}&destination=${arriver[0]},${arriver[1]}&return=polyline,summary,routeHandle&apikey=-2tUjsluW_sYRxJK8MewPG0ug4AfXEUC7I1aPAd5RV4`)//routeAPI) 

    const routePolyline = routePolylineAPI.routes[0].sections[0].polyline
    if (!routePolylineAPI.routes.length) {
        throw new Error("Aucun chemin trouvé")
    }

    let URI = ` https://discover.search.hereapi.com/v1/discover?apiKey=joMJEQ1I4K91vF4CAijYMD-cvtabfFAY-iHttZRSnto&at=${milieu[0]},${milieu[1]}&limit=10&route=${routePolyline}&q=${theme}`
    // let URI = ` https://discover.search.hereapi.com/v1/discover?apiKey=joMJEQ1I4K91vF4CAijYMD-cvtabfFAY-iHttZRSnto&at=${optimal[0]},${optimal[1]}&limit=10&route=${routePolyline}&q=${theme}`
    let pointInteretAPI = await fetchAsync(URI) 

    if(!pointInteretAPI.items.length){
        return undefined
    }
    let pointInteret = pointInteretAPI.items

    return pointInteret;

};


function listPOI (resume){
    let POI = []
    resume.POI.forEach(element => {
        try{
            element.Nature["type"] = "nature"
            POI.push(element.Nature)
        }
        catch(e){

        }
    });
}


function extractUtilsValue(P_boulangerie1){

    let P_boulangerie = {
        titre : P_boulangerie1.title,
        adresse : P_boulangerie1.address.label,
        coordonnees : P_boulangerie1.position
    }

    try{
        P_boulangerie["contact"] = P_boulangerie1.contacts[0].phone[0].value
    }
    catch(e){

    }
    try{
        P_boulangerie["lien"] = P_boulangerie1.contacts[0].www[0].value        }
    catch(e){

    }
    return P_boulangerie
}


/** la vrai api à tester
 trajet/47.221255/-1.572770/47.244038/-1.526411/pedestrian/nature/false/false/true/false
 *                      /trajet/:depart                   /:arrivee                    /:transport/:sty  /:sal /:bar /:blg/:pharmacie
 
 */

//https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=47.22106,-1.55243

function getStreetViewUrl(latitude,longitude){
    return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latitude},${longitude}`
}

<<<<<<< HEAD
async function getAll(req,res){

    let transport = req.params.transport;//"pedestrian"
    let style = req.params.style; // a voir comment le définir (parc/jardin)
    let sallesport = req.params.sallesport;
    let bar = req.params.bar;
    let boulangerie = req.params.boulangerie;
    let pharmacie = req.params.pharmacie;

    /** =================debut de modifications=================================*/
    let origin = [-1,-1]
    let arrivee = [-1,-1]

    origin[0] = +req.params.departX
    origin[1] = +req.params.departY

    arrivee[0] = +req.params.arriveeX
    arrivee[1] = +req.params.arriveeY
    /** ================= fin =================================*/

    let list_POI = [];


    /** definition du style : nature/culture/aleatoire */
    switch(style){
        case "nature":
            let listNature = await pointInteret(origin, arrivee, "natural-geographical", transport)
            
            if(listNature){
                  // let randN = getRandomInt(0, listNature.length)
                // let P_nature1 = listNature[randN]
                let indexResult = getShortestExcursion(listNature);
                let P_nature1 = listNature[indexResult];

                let P_nature = extractUtilsValue(P_nature1);
                P_nature["description"] = "Tu passes juste à côté de ce petit coin vert, voici l'occasion parfaite pour admirer la végétation et respirer le grand air !";
                P_nature["streetView"] = getStreetViewUrl(P_nature.coordonnees.lat,P_nature.coordonnees.lng);
                list_POI.push({"Nature": P_nature,
                                "distance": P_nature1.distance})
            }
          
            break;
        default :
            let listCulture = await pointInteret(origin, arrivee, "tourist-attraction", transport)
            // let randC = getRandomInt(0, listCulture.length)
            // let P_culture1 = listCulture[randC]
           if(listCulture){
                let indexResult1 = getShortestExcursion(listCulture);
                let P_culture1 = listCulture[indexResult1]

                let P_culture = extractUtilsValue(P_culture1)
                P_culture["description"] = "Petite halte culturelle, ce lieu historique se trouve sur ton trajet. Il s'agit d'un élément incournable du patrimoine culturel nantais !"
                P_culture["streetView"] = getStreetViewUrl(P_culture.coordonnees.lat,P_culture.coordonnees.lng);
                list_POI.push({"Culture": P_culture,
                                "distance": P_culture1.distance})
           }

        
    }


||||||| a20bf3a
async function getAll(req,res){

    let transport = req.params.transport;//"pedestrian"
    let style = req.params.style; // a voir comment le définir (parc/jardin)
    let sallesport = req.params.sallesport;
    let bar = req.params.bar;
    let boulangerie = req.params.boulangerie;
    let pharmacie = req.params.pharmacie;

    /** =================debut de modifications=================================*/
    let origin = [-1,-1]
    let arrivee = [-1,-1]

    origin[0] = +req.params.departX
    origin[1] = +req.params.departY

    arrivee[0] = +req.params.arriveeX
    arrivee[1] = +req.params.arriveeY
    /** ================= fin =================================*/

    let list_POI = [];


    /** definition du style : nature/culture/aleatoire */
    switch(style){
        case "nature":
            let listNature = await pointInteret(origin, arrivee, "natural-geographical", transport)
            
            if(listNature){
                  // let randN = getRandomInt(0, listNature.length)
                // let P_nature1 = listNature[randN]
                let indexResult = getShortestExcursion(listNature);
                let P_nature1 = listNature[indexResult];

                let P_nature = extractUtilsValue(P_nature1);
                P_nature["description"] = "Tu passes juste à côté de ce petit coin vert, voici l'occasion parfaite pour admirer la végétation et respirer le grand air !";
                P_nature["streetView"] = getStreetViewUrl(P_nature.coordonnees.lat,P_nature.coordonnees.lng);
                list_POI.push({"Nature": P_nature,
                                "distance": P_nature1.distance})
            }
          
            break;
        case "culture":
            let listCulture = await pointInteret(origin, arrivee, "tourist-attraction", transport)
            // let randC = getRandomInt(0, listCulture.length)
            // let P_culture1 = listCulture[randC]
           if(listCulture){
                let indexResult1 = getShortestExcursion(listCulture);
                let P_culture1 = listCulture[indexResult1]

                let P_culture = extractUtilsValue(P_culture1)
                P_culture["description"] = "Petite halte culturelle, ce lieu historique se trouve sur ton trajet. Il s'agit d'un élément incournable du patrimoine culturel nantais !"
                P_culture["streetView"] = getStreetViewUrl(P_culture.coordonnees.lat,P_culture.coordonnees.lng);
                list_POI.push({"Culture": P_culture,
                                "distance": P_culture1.distance})
           }

            
            break;

        default :
        let themes = ["nature", "culture"]
        let randomHasard = getRandomIntInclusive(0, 1);
        let listHasard = await pointInteret(origin, arrivee, themes[randomHasard], transport)
            
        if(listHasard){
            let randH = getRandomInt(0, listHasard.length)

            let P_hasard1 = listHasard[randH]
            let P_hasard = extractUtilsValue(P_hasard1)
            list_POI.push({"Hasard": P_hasard,
                            "distance": P_hasard1.distance})
        }
        
    }


=======
async function choixLieux(boulangerie, origin, arrivee, transport, list_POI, sallesport, bar, pharmacie) {
>>>>>>> map
    /** boulangerie */
    if (boulangerie == "true") {
        let listBoul = await pointInteret(origin, arrivee, "bakery", transport)
        // let randB = getRandomInt(0, listBoul.length)
        // let P_boulangerie1 = listBoul[randB]
        if (listBoul) {
            let indexResult2 = getShortestExcursion(listBoul);
            let P_boulangerie1 = listBoul[indexResult2]

            let P_boulangerie = extractUtilsValue(P_boulangerie1)
            P_boulangerie["description"] = "Hmm on dirait qu’une boulangerie se trouve sur ton trajet retour. Plutôt baguette, viennoiserie ou pâtisserie ?"
            P_boulangerie["streetView"] = getStreetViewUrl(P_boulangerie.coordonnees.lat, P_boulangerie.coordonnees.lng);
            list_POI.push({
                "Boulangerie": P_boulangerie,
                "distance": P_boulangerie1.distance
            })
        }

    }

    /** SALLES SPORT */
    if (sallesport == "true") {
        let listSalle = await pointInteret(origin, arrivee, "fitness-health-club", transport)
        // let randS = getRandomInt(0, listSalle.length)
        // let P_salle1 = listSalle[randS]
        if (listSalle) {
            let indexResult3 = getShortestExcursion(listSalle);
            let P_salle1 = listSalle[indexResult3];


            let P_salle = extractUtilsValue(P_salle1)
            P_salle["description"] = "La salle de sport Basic Fit est sur ton chemin ! Une belle occasion de te défouler après ta journée."
            P_salle["streetView"] = getStreetViewUrl(P_salle.coordonnees.lat, P_salle.coordonnees.lng);
            list_POI.push({
                "SalleSport": P_salle,
                "distance": P_salle1.distance
            })
        }

    }

    /** bar */
    if (bar == "true") {
        let listBar = await pointInteret(origin, arrivee, "bar", transport)
        // let randBar = getRandomInt(0, listBar.length)
        // let P_bar1 = listBar[randBar]
        if (listBar) {
            let indexResult4 = getShortestExcursion(listBar);
            let P_bar1 = listBar[indexResult4];


            let P_bar = extractUtilsValue(P_bar1)
            P_bar["description"] = "Ce bar se trouve sur ton chemin. De quoi profiter seul ou à plusieurs, d’un moment de détente en fin de journée."
            P_bar["streetView"] = getStreetViewUrl(P_bar.coordonnees.lat, P_bar.coordonnees.lng);
            list_POI.push({
                "Bar": P_bar,
                "distance": P_bar1.distance
            })
        }

    }


    /** pharmacie */
    if (pharmacie == "true") {
        let listpharmacie = await pointInteret(origin, arrivee, "pharmacie", transport)
        // let randP = getRandomInt(0, listpharmacie.length)
        // let P_pharmacie1 = listpharmacie[randP]

        if (listpharmacie) {
            let indexResult5 = getShortestExcursion(listpharmacie);
            let P_pharmacie1 = listpharmacie[indexResult5]


            let P_pharmacie = extractUtilsValue(P_pharmacie1)
            P_pharmacie["description"] = "Tiens, au cas où tu en aurais besoin, une pharmacie se situe entre ton lieu de travail et ton domicile."
            P_pharmacie["streetView"] = getStreetViewUrl(P_pharmacie.coordonnees.lat, P_pharmacie.coordonnees.lng);
            list_POI.push({
                "Pharmacie": P_pharmacie,
                "distance": P_pharmacie1.distance
            })
        }


    }
}

async function choixStyle(style, origin, arrivee, transport, list_POI) {
    /** definition du style : nature/culture/aleatoire */
    if (style === "nature") {
        let listNature = await pointInteret(origin, arrivee, "natural-geographical", transport)

        if (listNature) {
            // let randN = getRandomInt(0, listNature.length)
            // let P_nature1 = listNature[randN]
            let indexResult = getShortestExcursion(listNature);
            let P_nature1 = listNature[indexResult];

            let P_nature = extractUtilsValue(P_nature1);
            P_nature["description"] = "Tu passes juste à côté de ce petit coin vert, voici l'occasion parfaite pour admirer la végétation et respirer le grand air !";
            P_nature["streetView"] = getStreetViewUrl(P_nature.coordonnees.lat, P_nature.coordonnees.lng);
            list_POI.push({
                "Nature": P_nature,
                "distance": P_nature1.distance
            })
        }
    } else if (style === "culture") {
        let listCulture = await pointInteret(origin, arrivee, "tourist-attraction", transport)
        // let randC = getRandomInt(0, listCulture.length)
        // let P_culture1 = listCulture[randC]
        if (listCulture) {
            let indexResult1 = getShortestExcursion(listCulture);
            let P_culture1 = listCulture[indexResult1]

            let P_culture = extractUtilsValue(P_culture1)
            P_culture["description"] = "Petite halte culturelle, ce lieu historique se trouve sur ton trajet. Il s'agit d'un élément incournable du patrimoine culturel nantais !"
            P_culture["streetView"] = getStreetViewUrl(P_culture.coordonnees.lat, P_culture.coordonnees.lng);
            list_POI.push({
                "Culture": P_culture,
                "distance": P_culture1.distance
            })
        }

    } else {
        let themes = ["nature", "culture"]
        let randomHasard = getRandomIntInclusive(0, 1);
        let listHasard = await pointInteret(origin, arrivee, themes[randomHasard], transport)

        if (listHasard) {
            let randH = getRandomInt(0, listHasard.length)

            let P_hasard1 = listHasard[randH]
            let P_hasard = extractUtilsValue(P_hasard1)
            list_POI.push({
                "Hasard": P_hasard,
                "distance": P_hasard1.distance
            })
        }
    }
}

async function getAll(req,res){

    let transport = req.params.transport;//"pedestrian"
    let style = req.params.style; // a voir comment le définir (parc/jardin)
    let sallesport = req.params.sallesport;
    let bar = req.params.bar;
    let boulangerie = req.params.boulangerie;
    let pharmacie = req.params.pharmacie;

    /** =================debut de modifications=================================*/
    let origin = [-1,-1]
    let arrivee = [-1,-1]

    origin[0] = +req.params.departX
    origin[1] = +req.params.departY

    arrivee[0] = +req.params.arriveeX
    arrivee[1] = +req.params.arriveeY
    /** ================= fin =================================*/

    let list_POI = [];
    try {
        await choixStyle(style, origin, arrivee, transport, list_POI);
        await choixLieux(boulangerie, origin, arrivee, transport, list_POI, sallesport, bar, pharmacie);

        list_POI = list_POI.sort(function(a, b){
            return a.distance-b.distance;
        })


        /** la reponse retourner */
        let reponseJSON = {
            Depart : origin,
            Arrivee : arrivee,
            POI : list_POI
        };

        res.status(200).json(reponseJSON);
    } catch (e) {
        res.status(404).json(e.message)
    }

};

// ************* fin ************************

module.exports = getAll;





