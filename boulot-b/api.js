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

/*     console.log('URI est :');
    console.log(departURI2)
 */
    let departData = fetchAsync(departURI2)
    let departAsync = await departData.then(res=>{
        return res})

/*     console.log('mon adresse est :');
    console.log(departAsync.features[0].geometry.coordinates)
 */
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


/** renvoie la liste des points d'interets */
async function pointInteret(adresseDepart, adresseArriver, theme, transport){
    
    let depart = await adresse2coord(adresseDepart)
    let arriver =  await adresse2coord(adresseArriver)

  /*   console.log('Le depart est :')
    console.log(depart) */

    let routeAPI = `https://router.hereapi.com/v8/routes?
    alternatives=0&
    origin=${depart[1]},${depart[0]}&
    transportMode=pedestrian&
    destination=${arriver[1]},${arriver[0]}&
    return=polyline,summary,routeHandle&
    apikey=-2tUjsluW_sYRxJK8MewPG0ug4AfXEUC7I1aPAd5RV4
    `

    /* console.log('la route API est :')
    console.log(routeAPI) */

    let routePolylineAPI = await fetchAsync(`https://router.hereapi.com/v8/routes?alternatives=0&origin=47.283234,-1.51707&transportMode=${transport}&destination=47.180037,-1.55536&return=polyline,summary,routeHandle&apikey=-2tUjsluW_sYRxJK8MewPG0ug4AfXEUC7I1aPAd5RV4`)//routeAPI) 
    // let routePolyline = await routePolylineAPI.then(res => {
    //     console.log("le res est :")
    //     console.log(res)
    //     return res
    // })

    let routePolyline = routePolylineAPI.routes[0].sections[0].polyline
    // console.log(routePolyline)

    let URI = ` https://discover.search.hereapi.com/v1/discover?apiKey=joMJEQ1I4K91vF4CAijYMD-cvtabfFAY-iHttZRSnto&at=41.70035,-93.20866&limit=10&route=${routePolyline}&q=${theme}`
    let pointInteretAPI = await fetchAsync(URI) 
/*     console.log(pointInteretAPI) */

    let pointInteret = pointInteretAPI.items
  /*   console.log(pointInteret) */

    return pointInteret;

};


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
 * http://127.0.0.1:8080/trajet/3+rue+christian+pauc+nantes/7+rue+george+berthome+nantes/pedestrian/nature/false/false/true/false
 *                      /trajet/:depart                   /:arrivee                    /:transport/:sty  /:sal /:bar /:blg/:pharmacie
 
 */

//https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=47.22106,-1.55243

function getStreetViewUrl(latitude,longitude){
    return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latitude},${longitude}`
}

async function getAll(req,res){
    let origin = req.params.depart;//"3 rue christian Pauc" //req.params.depart;
    let arrivee = req.params.arrivee;//"7 rue george berthome nantes"
    let transport = req.params.transport;//"pedestrian"
    let style = req.params.style; // a voir comment le définir (parc/jardin)
    let sallesport = req.params.sallesport;
    let bar = req.params.bar;
    let boulangerie = req.params.boulangerie;
    let pharmacie = req.params.pharmacie;

    /** tableau de coordonnee */ 
    let originCordinat = await adresse2coord(origin)

    let arriveeCordinat = await adresse2coord(arrivee)

    /** la liste des coordonees des points d'interet interessant */
    let list_POI = [];


    /** definition du style : nature/culture/aleatoire */
    switch(style){
        case "nature":
            let listNature = await pointInteret(origin, arrivee, "natural-geographical", transport)
            let randN = getRandomInt(0, listNature.length)

            let P_nature1 = listNature[randN]
            let P_nature = extractUtilsValue(P_nature1);
            P_nature["description"] = "Tu passes juste à côté de ce petit coin vert, voici l'occasion parfaite pour admirer la végétation et respirer le grand air !";
            P_nature["streetView"] = getStreetViewUrl(P_nature.coordonnees.lat,P_nature.coordonnees.lng);
            list_POI.push({"Nature": P_nature})
            break;
        case "culture":
            let listCulture = await pointInteret(origin, arrivee, "tourist-attraction", transport)
            let randC = getRandomInt(0, listCulture.length)

            let P_culture1 = listCulture[randC]
            let P_culture = extractUtilsValue(P_culture1)
            P_culture["description"] = "Petite halte culturelle, ce lieu historique se trouve sur ton trajet. Il s'agit d'un élément incournable du patrimoine culturel nantais !"
            P_culture["streetView"] = getStreetViewUrl(P_culture.coordonnees.lat,P_culture.coordonnees.lng);
            list_POI.push({"Culture": P_culture})
            break;

        default :
        let themes = ["nature", "culture"]
        let randomHasard = getRandomIntInclusive(0, 1);
        let listHasard = await pointInteret(origin, arrivee, themes[randomHasard], transport)
            let randH = getRandomInt(0, listHasard.length)

            let P_hasard1 = listHasard[randH]
            let P_hasard = extractUtilsValue(P_hasard1)
            list_POI.push({"Hasard": P_hasard})
    }


    /** boulangerie */
    if(boulangerie == "true"){
        let listBoul = await pointInteret(origin, arrivee, "bakery", transport)
        let randB = getRandomInt(0, listBoul.length)

        let P_boulangerie1 = listBoul[randB]
        let P_boulangerie = extractUtilsValue(P_boulangerie1)
        P_boulangerie["description"] = "Hmm on dirait qu’une boulangerie se trouve sur ton trajet retour. Plutôt baguette, viennoiserie ou pâtisserie ?"
        P_boulangerie["streetView"] = getStreetViewUrl(P_boulangerie.coordonnees.lat,P_boulangerie.coordonnees.lng);
        list_POI.push({"Boulangerie": P_boulangerie})
    }

    /** SALLES SPORT */
    if(sallesport == "true"){
        let listSalle = await pointInteret(origin, arrivee, "fitness-health-club", transport)
        let randS = getRandomInt(0, listSalle.length)

        let P_salle1 = listSalle[randS]
        let P_salle = extractUtilsValue(P_salle1)
        P_salle["description"] = "La salle de sport Basic Fit est sur ton chemin ! Une belle occasion de te défouler après ta journée."
        P_salle["streetView"] = getStreetViewUrl(P_salle.coordonnees.lat,P_salle.coordonnees.lng);
        list_POI.push({"SalleSport": P_salle})
    }

     /** bar */
     if(bar == "true"){
        let listBar = await pointInteret(origin, arrivee, "bar", transport)
        let randBar = getRandomInt(0, listBar.length)

        let P_bar1 = listBar[randBar]
        let P_bar = extractUtilsValue(P_bar1)
        P_bar["description"] = "Ce bar se trouve sur ton chemin. De quoi profiter seul ou à plusieurs, d’un moment de détente en fin de journée."
        P_bar["streetView"] = getStreetViewUrl(P_bar.coordonnees.lat,P_bar.coordonnees.lng);
        list_POI.push({"Bar": P_bar})
    }


    /** pharmacie */
    if( pharmacie == "true"){
        let listpharmacie = await pointInteret(origin, arrivee, "pharmacie", transport)
        let randP = getRandomInt(0, listpharmacie.length)

        let P_pharmacie1 = listpharmacie[randP]
        let P_pharmacie = extractUtilsValue(P_pharmacie1)
        P_pharmacie["description"] = "Tiens, au cas où tu en aurais besoin, une pharmacie se situe entre ton lieu de travail et ton domicile."
        P_pharmacie["streetView"] = getStreetViewUrl(P_pharmacie.coordonnees.lat,P_pharmacie.coordonnees.lng);
        list_POI.push({"Pharmacie": P_pharmacie})
    }

    /** la reponse retourner */
    let reponseJSON = {
        Depart : originCordinat,
        Arrivee : arriveeCordinat,
        POI : list_POI
    };

    res.status(200).json(reponseJSON);

};

// ************* fin ************************

module.exports = getAll;





