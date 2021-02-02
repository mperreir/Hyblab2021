// Use strict mode
'use strict';


//%%%%%%%%%%%%%%%%%%%%% Les fonctions utilitaires%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

let HttpsProxyAgent = require( 'https-proxy-agent' );

const options = {
     // agent: new HttpsProxyAgent( 'http://cache.ha.univ-nantes.fr:3128' ),
};

// fetch Asynchrone
const fetch = require('node-fetch');
const CultureStyle = require("./CultureStyle");
const NatureStyle = require("./NatureStyle");
const Boulangerie = require("./Boulangerie");
const SalleDeSport = require("./SalleDeSport");
const Bar = require("./Bar");
const Pharmacie = require("./Pharmacie");

 async function fetchAsync (url) {
    const response = await fetch(url, options);
    return await response.json();
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

/** renvoie la liste des points d'interets */
 async function pointInteret(coordonneeD, coordoneeA, theme, transport){
/* debut */
    const depart = coordonneeD
    const arriver = coordoneeA
    const milieu = [-1,-1]
    milieu[0] = (depart[0] + arriver[0])/2
    milieu[1] = (depart[1] + arriver[1])/2
    const routePolylineAPI = await fetchAsync(`https://router.hereapi.com/v8/routes?alternatives=0&origin=${depart[0]},${depart[1]}&transportMode=${transport}&destination=${arriver[0]},${arriver[1]}&return=polyline,summary,routeHandle&apikey=-2tUjsluW_sYRxJK8MewPG0ug4AfXEUC7I1aPAd5RV4`)//routeAPI)
    const routePolyline = routePolylineAPI.routes[0].sections[0].polyline
    if (!routePolylineAPI.routes.length) {
        throw new Error("Aucun chemin trouvé")
    }
    const URI = ` https://discover.search.hereapi.com/v1/discover?apiKey=joMJEQ1I4K91vF4CAijYMD-cvtabfFAY-iHttZRSnto&at=${milieu[0]},${milieu[1]}&limit=10&route=${routePolyline}&q=${theme}`
    // let URI = ` https://discover.search.hereapi.com/v1/discover?apiKey=joMJEQ1I4K91vF4CAijYMD-cvtabfFAY-iHttZRSnto&at=${optimal[0]},${optimal[1]}&limit=10&route=${routePolyline}&q=${theme}`
    const pointInteretAPI = await fetchAsync(URI)
    if(!pointInteretAPI.items.length){
        return undefined
    }
    return pointInteretAPI.items;
};


function extractUtilsValue(P_boulangerie1){
    const P_boulangerie = {
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

function getStreetViewUrl(latitude,longitude){
    return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latitude},${longitude}`
}


async function addLieuxData(origin, arrivee, lieux, transport, list_POI) {
    let list = await pointInteret(origin, arrivee, lieux.theme, transport)
    if (list) {
        let indexResult2 = getShortestExcursion(list);
        let data = list[indexResult2]

        let POI = extractUtilsValue(data)
        POI["description"] = lieux.description
        POI["streetView"] = getStreetViewUrl(POI.coordonnees.lat, POI.coordonnees.lng);
        list_POI.push({
            [lieux.name]: POI,
            "distance": data.distance
        })
    }
}

async function choixLieux(boulangerie, origin, arrivee, transport, list_POI, sallesport, bar, pharmacie) {
    /** boulangerie */
    if (boulangerie) {
        const boulang = new Boulangerie()
        await addLieuxData(origin, arrivee, boulang, transport, list_POI);
    }
    /** SALLES SPORT */
    if (sallesport) {
        const salle = new SalleDeSport()
        await addLieuxData(origin, arrivee, salle, transport, list_POI);
    }
    /** bar */
    if (bar) {
        const ba = new Bar()
        await addLieuxData(origin, arrivee, ba, transport, list_POI);
    }
    if (pharmacie) {
        const pharma = new Pharmacie()
        await addLieuxData(origin, arrivee, pharma, transport, list_POI);
    }
}

function StyleFactory(style){
    if (style === "nature")
        return new NatureStyle()
    if (style === "culture")
        return new CultureStyle()
}

async function choixStyle(style, origin, arrivee, transport, list_POI) {
    /** definition du style : nature/culture/aleatoire */
    if (style === "alea")  {
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
    } else {
        const newStyle = StyleFactory(style)
        let list = await pointInteret(origin, arrivee, newStyle.theme, transport)
        if (list) {
            let indexResult = getShortestExcursion(list);
            let data = list[indexResult];
            let POI = extractUtilsValue(data);
            POI["description"] = newStyle.description
            POI["streetView"] = getStreetViewUrl(POI.coordonnees.lat, POI.coordonnees.lng);
            list_POI.push({
                [newStyle.name]: POI,
                "distance": data.distance
            })
        }
    }
}

async function getAll(req,res){

    const {transport, style, sallesport, bar, boulangerie, pharmacie,
            departX, departY, arriveeX, arriveeY} = req.params
    /** =================debut de modifications=================================*/
    const origin = [-1,-1]
    const arrivee = [-1,-1]

    origin[0] = Number(departX)
    origin[1] = Number(departY)
    arrivee[0] = Number(arriveeX)
    arrivee[1] = Number(arriveeY)
    /** ================= fin =================================*/

    let list_POI = [];
    try {
        await choixStyle(style, origin, arrivee, transport, list_POI);
        await choixLieux(boulangerie, origin, arrivee, transport, list_POI, sallesport, bar, pharmacie);

        list_POI = list_POI.sort(function(a, b){
            return a.distance-b.distance;
        })
        /** la reponse retourner */
        const reponseJSON = {
            Depart : origin,
            Arrivee : arrivee,
            POI : list_POI
        };
        res.status(200).json(reponseJSON);
    } catch (e) {
        res.status(404).json(e.message)
    }
}
module.exports = getAll;

