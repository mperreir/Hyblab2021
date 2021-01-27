'use strict';

let express = require('express');
let app = express();

app.use(express.static('public'));

let port = 8080;
let api = require('./api');

app.get('/', function(req, res) { // création de la route sous le verbe get
    res.send(' Bonjouuuuuurrr! felicitation tu as reussi a lancer le serveur et ton get marche  ! ') // envoi de hello world a l'utilisateur
})

//%%%%%%%%%%%%%%%%%%%%% Les fonctions utilitaires%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// fetch Asynchrone
const fetch = require('node-fetch');

 async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function adresse2coord(adresse){
    let departSplit = adresse.split(' ')

    let departURI2 = 'https://api-adresse.data.gouv.fr/search/?q='

    departSplit.forEach(element => {
        departURI2 += element + '+'
    });

    console.log('URI est :');
    console.log(departURI2)

    let departData = fetchAsync(departURI2)
    let departAsync = await departData.then(res=>{
        return res})

    console.log('mon adresse est :');
    console.log(departAsync.features[0].geometry.coordinates)

    let coordonee = departAsync.features[0].geometry.coordinates;
    console.log('les coordonnes sont :');
    console.log(coordonee)

    return coordonee;
}

/** une fonction qui retourn un random */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


/** renvoie la liste des points d'interets */
async function pointInteret(adresseDepart, adresseArriver, theme, transport){
    
    let depart = await adresse2coord(adresseDepart)
    let arriver =  await adresse2coord(adresseArriver)

    console.log('Le depart est :')
    console.log(depart)

    let routeAPI = `https://router.hereapi.com/v8/routes?
    alternatives=0&
    origin=${depart[1]},${depart[0]}&
    transportMode=pedestrian&
    destination=${arriver[1]},${arriver[0]}&
    return=polyline,summary,routeHandle&
    apikey=-2tUjsluW_sYRxJK8MewPG0ug4AfXEUC7I1aPAd5RV4
    `

    console.log('la route API est :')
    console.log(routeAPI)

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
    console.log(pointInteretAPI)

    let pointInteret = pointInteretAPI.items
    console.log(pointInteret)

    return pointInteret;

};

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    /** pour lancer le serveur :
     * installer : npm avec npm install/ node-fetch
     * puis dans un terminal se placer sur le repetoire contenant ce fichier
     * lancer le serveur avec npm start
     * dans un navigateur taper localhost:8080
     * >normalement si tout se passe bien vous voyer le message suivant :
     * Bonjouuuuuurrr! felicitation tu as reussi a lancer le serveur et ton get marche  !
     * faire le test ci dessous
     */

 /** %%%%%%%%%%%%%%%% api de test %%%%%%%%%%%%%%%%%%%%% 
  * lancer le test avec cette url :
  * http://127.0.0.1:8080/trajet/22+rue+francois+mireur+montpellier/gare+saint+roch+montpellier/pedestrian/
 */
 app.get('/trajet/:depart/:arrivee/:transport/:boulangerie', async (req, res) => {
    let origin = req.params.depart;//"3 rue christian Pauc" //req.params.depart;
    let arrivee = req.params.arrivee;//"7 rue george berthome nantes"
    let transport = req.params.transport;//"pedestrian"
    let boulangerie = req.params.boulangerie;

     /** tableau de coordonnee */ 
     let originCordinat = await adresse2coord(origin)

     let arriveeCordinat = await adresse2coord(arrivee)
 
     /** la liste des coordonees des points d'interet interessant */
     let list_POI = [];

      /** boulangerie */
    if(boulangerie == "true"){
        let listBoul = await pointInteret(origin, arrivee, "bakery", transport)
        let randB = getRandomInt(0, listBoul.length)

        let P_boulangerie = listBoul[randB]
        list_POI.push(P_boulangerie)
    }
    /** la reponse retourner */
    let reponseJSON = {
        Depart : originCordinat,
        Arrivee : arriveeCordinat,
        POI : list_POI
    };

    res.status(200).json(reponseJSON);
})

//%%%%%%%%%%%%%%%%%%% FIN DE TEST %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

/** la vrai api à tester */
app.get('/trajet/:depart/:arrivee/:transport/:detour/:style/:sallesport/:bar/:boulangerie/:pharmacie', async (req, res) => {
    let origin = req.params.depart;//"3 rue christian Pauc" //req.params.depart;
    let arrivee = req.params.arrivee;//"7 rue george berthome nantes"
    let transport = req.params.transport;//"pedestrian"
    let detour = req.params.detour;
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
            let listNature = pointInteret(origin, arrivee, "parc/jardin", transport)
            let randN = getRandomInt(0, listNature.length)

            let P_nature = listNature[randN]
            list_POI.push(P_nature)
            break;
        case "culture":
            let listCulture = pointInteret(origin, arrivee, "Monument", transport)
            let randC = getRandomInt(0, listCulture.length)

            let P_culture = listNature[randC]
            list_POI.push(P_culture)
            break;

        default :
        let themes = ["Monument", "parc/jardin"]
        let randomHasard = getRandomIntInclusive(1, 0);
        let listHasard = pointInteret(origin, arrivee, themes[randomHasard], transport)
            let randH = getRandomInt(0, listHasard.length)

            let P_hasard = listHasard[randH]
            list_POI.push(P_hasard)
    }


    /** boulangerie */
    if(boulangerie == "true"){
        let listBoul = await pointInteret(origin, arrivee, "bakery", transport)
        let randB = getRandomInt(0, listBoul.length)

        let P_boulangerie = listBoul[randB]
        list_POI.push(P_boulangerie)
    }

    /** SALLES SPORT */
    if(sallesport == "true"){
        let listSalle = pointInteret(origin, arrivee, "sallesport", transport)
        let randS = getRandomInt(0, listSalle.length)

        let P_salle = listSalle[randS]
        list_POI.push(P_salle)
    }

     /** bar */
     if(bar == "true"){
        let listBar = pointInteret(origin, arrivee, "bar", transport)
        let randBar = getRandomInt(0, listBar.length)

        let P_bar = listBar[randBar]
        list_POI.push(P_bar)
    }


    /** pharmacie */
    if( pharmacie == "true"){
        let listpharmacie = pointInteret(origin, arrivee, "pharmacie", transport)
        let randP = getRandomInt(0, listP.length)

        let P_pharmacie = listpharmacie[randP]
        list_POI.push(P_pharmacie)
    }

    /** la reponse retourner */
    let reponseJSON = {
        Depart : originCordinat,
        Arrivee : arriveeCordinat,
        POI : list_POI
    };

    res.status(200).json(reponseJSON);

});

// ************* fin ************************

app.listen(port);