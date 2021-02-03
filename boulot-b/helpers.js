const fetch = require('node-fetch');
const HttpsProxyAgent = require( 'https-proxy-agent' );

/** une fonction qui retourn un random */
function  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getStreetViewUrl(latitude,longitude){
    return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latitude},${longitude}`
}

async function fetchAsync (url) {
    const options = {
        // agent: new HttpsProxyAgent( 'http://cache.ha.univ-nantes.fr:3128' ),
    };
    const response = await fetch(url, options);
    return response.json();
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

function  getShortestExcursion(listPOIs){
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


function extractUtilsValue(data) {
    const POI = {
        titre: data.title,
        adresse: data.address.label,
        coordonnees: data.position
    }
    if (data.contacts && data.contacts[0].phone) {
        POI["contact"] = data.contacts[0].phone[0].value
    }
    if (data.contacts && data.contacts[0].www) {
        POI["lien"] = data.contacts[0].www[0].value
    }
    return POI
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
    if (!routePolylineAPI.routes.length) {
        throw new Error("Aucun chemin trouvé")
    }
    const routePolyline = routePolylineAPI.routes[0].sections[0].polyline
    const URI = ` https://discover.search.hereapi.com/v1/discover?apiKey=joMJEQ1I4K91vF4CAijYMD-cvtabfFAY-iHttZRSnto&at=${milieu[0]},${milieu[1]}&limit=10&route=${routePolyline}&q=${theme}`
    // let URI = ` https://discover.search.hereapi.com/v1/discover?apiKey=joMJEQ1I4K91vF4CAijYMD-cvtabfFAY-iHttZRSnto&at=${optimal[0]},${optimal[1]}&limit=10&route=${routePolyline}&q=${theme}`
    const pointInteretAPI = await fetchAsync(URI)
    if(!pointInteretAPI.items.length){
        return undefined
    }
    return pointInteretAPI.items;
};

module.exports = {
    getRandomInt,
    getShortestExcursion,
    fetchAsync,
    getRandomIntInclusive,
    pointInteret,
    extractUtilsValue,
    getStreetViewUrl
}
