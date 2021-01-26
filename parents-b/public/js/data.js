'use strict';

let myCriteria = {
    "Géolocalisation": {
        lat: null,
        lng: null
    },
    "Distances" : {
        max: 10,
        reel: null,
        duration: null
    },
    "Gardien": null,
    "Jeux pour enfants": null,
    "Pataugeoire": null,
    "Sanitaires": null,
    "Sanitaires pour handicapés": null,
    "Chiens autorisés": null,
    "Jardin clos": null,
    "Abris": null,
    "Point d'eau": null,
    "Table pique-nique": null,
    "Accessibilité Handicapé": null,
    "Bancs": null,
    "Accès Parking": null,
    "Restauration": null,
    "Présence d'animaux": null,
    "Herbe (un minimum) / Sable": null,
    "Verdure / Plante Espace Vert": null,
    "CRAPA": null,
    "Terrains de sport": null,
    "Activités organisées": null,
    "Élément de culture": null,
    "Horaires d'ouverture": null,
    "Âge": null
};

let nbElemChoisit = 0;

function stringToBoolean(string) {
    return string === "true";
}

function choiceUpdate(string, currentValue) {
    if (currentValue === true || currentValue === false) {
        if (string === "null") {
            nbElemChoisit--;
            return null;
        }
        else return stringToBoolean(string);
    } else {
        if (string === "null") {
            return null;
        }
        else {
            nbElemChoisit++;
            return stringToBoolean(string);
        }
    }
}

function distAttribute(event) {
    myCriteria["Distances"].max = parseInt(event.target.value);
    console.log(myCriteria["Distances"]);
}

function geoAttribute(latitude, longitude) {
    const geo = myCriteria["Géolocalisation"];
    if (!geo.lat && !geo.lng) nbElemChoisit++;
    myCriteria["Géolocalisation"].lat = parseFloat(latitude).toFixed(9);
    myCriteria["Géolocalisation"].lng = parseFloat(longitude).toFixed(9);
}

function noGeoAttribute(event) {
    myCriteria["Géolocalisation"].lat = null;
    myCriteria["Géolocalisation"].lng = null;
    nbElemChoisit--;
}

function latAttribute(event) {
    const geo = myCriteria["Géolocalisation"];
    if (!geo.lat && !geo.lng) {
        nbElemChoisit++;
    }
    myCriteria["Géolocalisation"].lat = parseInt(event.target.value);
}

function lngAttribute(event) {
    const geo = myCriteria["Géolocalisation"];
    if (!geo.lat && !geo.lng) {
        nbElemChoisit++;
    }
    myCriteria["Géolocalisation"].lng = parseInt(event.target.value);
    console.log(myCriteria)
}

function gardAttribute(event) {
    const gard = myCriteria["Gardien"];
    myCriteria["Gardien"] = choiceUpdate(event.target.value, gard);
}

function childGameAttribute(event) {
    const childGame = myCriteria["Jeux pour enfants"];
    myCriteria["Jeux pour enfants"] = choiceUpdate(event.target.value, childGame);
}

function paddlingPoolAttribute(event) {
    const paddlingPool = myCriteria["Pataugeoire"];
    myCriteria["Pataugeoire"] = choiceUpdate(event.target.value, paddlingPool);
}

function toiletAttribute(event) {
    const toilet = myCriteria["Sanitaires"];
    myCriteria["Sanitaires"] = choiceUpdate(event.target.value, toilet);
}

function handicapToiletAttribute(event) {
    const handicapToilet = myCriteria["Sanitaires pour handicapés"];
    myCriteria["Sanitaires pour handicapés"] = choiceUpdate(event.target.value, handicapToilet);
}

function dogAttribute(event) {
    const dog = myCriteria["Chiens autorisés"];
    myCriteria["Chiens autorisés"] = choiceUpdate(event.target.value, dog);
}

function closedAttribute(event) {
    const closed = myCriteria["Jardin clos"];
    myCriteria["Jardin clos"] = choiceUpdate(event.target.value, closed);
}

function shelterAttribute(event) {
    const shelter = myCriteria["Abris"];
    myCriteria["Abris"] = choiceUpdate(event.target.value, shelter);
}

function waterAttribute(event) {
    const water = myCriteria["Point d'eau"];
    myCriteria["Point d'eau"] = choiceUpdate(event.target.value, water);
}

function tableAttribute(event) {
    const table = myCriteria["Table pique-nique"];
    myCriteria["Table pique-nique"] = choiceUpdate(event.target.value, table);
}

function handicapAccesAttribute(event) {
    const handicapAcces = myCriteria["Accessibilité Handicapé"];
    myCriteria["Accessibilité Handicapé"] = choiceUpdate(event.target.value, handicapAcces);
}

function benchesAttribute(event) {
    const benches = myCriteria["Bancs"];
    myCriteria["Bancs"] = choiceUpdate(event.target.value, benches);
}

function parkingAttribute(event) {
    const parking = myCriteria["Accès Parking"];
    myCriteria["Accès Parking"] = choiceUpdate(event.target.value, parking);
}

function restaurantAttribute(event) {
    const restaurant = myCriteria["Restauration"];
    myCriteria["Restauration"] = choiceUpdate(event.target.value, restaurant);
}

function animalsAttribute(event) {
    const animals = myCriteria["Présence d'animaux"];
    myCriteria["Présence d'animaux"] = choiceUpdate(event.target.value, animals);
}

function grassAttribute(event) {
    const grass = myCriteria["Herbe (un minimum) / Sable"];
    myCriteria["Herbe (un minimum) / Sable"] = choiceUpdate(event.target.value, grass);
}

function greeneryAttribute(event) {
    const greenery = myCriteria["Verdure / Plante Espace Vert"];
    myCriteria["Verdure / Plante Espace Vert"] = choiceUpdate(event.target.value, greenery);
}

function crapaAttribute(event) {
    const crapa = myCriteria["CRAPA"];
    myCriteria["CRAPA"] = choiceUpdate(event.target.value, crapa);
}

function sportAttribute(event) {
    const sport = myCriteria["Terrains de sport"];
    myCriteria["Terrains de sport"] = choiceUpdate(event.target.value, sport);
}

function activityAttribute(event) {
    const activity = myCriteria["Activités organisées"];
    myCriteria["Activités organisées"] = choiceUpdate(event.target.value, activity);
}

function cultureAttribute(event) {
    const culture = myCriteria["Élément de culture"];
    myCriteria["Élément de culture"] = choiceUpdate(event.target.value, culture);
}

function fetchData() {

    // Récupé les données sur tous les jardins
    fetch('data/jardins.json', {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(json => {
            if (myCriteria["Géolocalisation"].lat && myCriteria["Géolocalisation"].lng) {

                const geolocations = json.map(line => line["Géolocalisation"]);
                const service = new google.maps.DistanceMatrixService();
                const origin = new google.maps.LatLng(myCriteria["Géolocalisation"].lat, myCriteria["Géolocalisation"].lng);
                const destinations1 = [];

                geolocations.forEach(x => {
                    const latLng = x.split(', ');
                    const newDesti = new google.maps.LatLng(parseFloat(latLng[0]).toFixed(9), parseFloat(latLng[1]).toFixed(9));
                    destinations1.push(newDesti);
                });
                const destinations2 = destinations1.splice(0, 25);
                const destinations3 = destinations1.splice(0, 25);
                const destinations4 = destinations1.splice(0, 25);
                const destinations = [];
                destinations.push(destinations2);
                destinations.push(destinations3);
                destinations.push(destinations4);
                destinations.push(destinations1);
                destinations.forEach((x, i) => {
                    service.getDistanceMatrix({
                        origins: [origin],
                        destinations: x,
                        travelMode: google.maps.TravelMode.WALKING,
                        unitSystem: google.maps.UnitSystem.METRIC
                    }, (response, status) => {
                        if (status === 'OK') {
                            const respOrigin = response.originAddresses;
                            const respDestinations = response.destinationAddresses;
                            for (let current = 0; current < respOrigin.length; current++) {
                                const results = response.rows[current].elements;
                                for (let j = 0; j < results.length; j++) {
                                    const element = results[j];
                                    const distance = parseFloat(element.distance.text.split(' km')[0].replace(',', '.')).toFixed(1);
                                    const duration = element.duration.text;
                                    /*
                                    console.log('-----------------------');
                                    console.log(from);
                                    console.log(to);
                                    console.log(distance);
                                     */
                                    json[25*i + j]["Distances"]["reel"] = distance;
                                    json[25*i + j]["Distances"]["duration"] = duration;
                                    /*
                                    console.log(myCriteria["Distances"].max);
                                    console.log(json[25*i + j]["Distances"]["reel"]);
                                    console.log(json[25*i + j]["Distances"]["duration"] = duration);
                                    console.log((myCriteria["Distances"].max >= distance));
                                     */
                                    json[25*i + j]["Distances"]["valid"] = (myCriteria["Distances"].max >= distance);
                                }
                            }
                        }
                    });
                });
            }
            return json;
        })
        .then(json => {
            const nbCritere = Object.keys(myCriteria).length;
            for (const line of json) {
                for (const [key, value] of Object.entries(line)) {
                    switch (key) {
                        case "Géolocalisation":
                            break;
                        case "Distances":
                            if (value.valid) {
                                line["nbElemCorrect"]++;
                                line["listElemMatch"].push(key);
                            }
                            break;
                        default:
                            if (myCriteria[key]) {
                                if (myCriteria[key] != null && myCriteria[key] === value) {
                                    line["nbElemCorrect"]++;
                                    line["listElemMatch"].push(key);
                                }
                            }
                            break;
                    }
                }
                line.affinity = line["nbElemCorrect"] * 100 / nbCritere;
            }
            console.log(json);
            // Tri des jardins par affinité décroissante
            json.sort((a,b)=> b.affinity - a.affinity);

            // Récupération des 3 meilleurs
            const top = json.slice(0, 3);

            // Affichage de la page finale
            for (const line of top) {
                /*
                for (const [key, value] of Object.entries(line)) {
                    if (myCriteria[key]) {
                        if (myCriteria[key] != null && myCriteria[key] === value) {
                            line["nbElemCorrect"]++;
                        }
                    }
                }
                */
            }
            // document.getElementById('')
        })
}

function main() {

    const dist = document.getElementById('localize-range');
    dist.addEventListener('input', distAttribute);

    const removeGeo = document.getElementById('removeGeo');
    removeGeo.addEventListener('click', noGeoAttribute);

    /*
    // TODO 'garde' sera à remplacer par l'id de l'élément à tester
    const garde = document.getElementById('garde');
    garde.addEventListener('click', gardAttribute);

    // TODO 'jeuxEnfant' sera à remplacer par l'id de l'élément à tester
    const jeuxEnfant = document.getElementById('jeuxEnfant');
    jeuxEnfant.addEventListener('click', childGameAttribute);

    // TODO 'pataugeoire' sera à remplacer par l'id de l'élément à tester
    const pataugeoire = document.getElementById('pataugeoire');
    pataugeoire.addEventListener('click', paddlingPoolAttribute);

    // TODO 'toilette' sera à remplacer par l'id de l'élément à tester
    const toilette = document.getElementById('toilette');
    toilette.addEventListener('click', toiletAttribute);

    // TODO 'toiletteHandicape' sera à remplacer par l'id de l'élément à tester
    const toiletteHandicape = document.getElementById('toiletteHandicape');
    toiletteHandicape.addEventListener('click', handicapToiletAttribute);

    // TODO 'chien' sera à remplacer par l'id de l'élément à tester
    const chien = document.getElementById('chien');
    chien.addEventListener('click', dogAttribute);

    // TODO 'clos' sera à remplacer par l'id de l'élément à tester
    const clos = document.getElementById('clos');
    clos.addEventListener('click', closedAttribute);

    // TODO 'abris' sera à remplacer par l'id de l'élément à tester
    const abris = document.getElementById('abris');
    abris.addEventListener('click', shelterAttribute);

    // TODO 'pointDeau' sera à remplacer par l'id de l'élément à tester
    const pointDeau = document.getElementById('pointDeau');
    pointDeau.addEventListener('click', waterAttribute);

    // TODO 'piqueNique' sera à remplacer par l'id de l'élément à tester
    const piqueNique = document.getElementById('piqueNique');
    piqueNique.addEventListener('click', tableAttribute);

    // TODO 'accesHandicape' sera à remplacer par l'id de l'élément à tester
    const accesHandicape = document.getElementById('accesHandicape');
    accesHandicape.addEventListener('click', handicapAccesAttribute);

    // TODO 'banc' sera à remplacer par l'id de l'élément à tester
    const banc = document.getElementById('banc');
    banc.addEventListener('click', benchesAttribute);

    // TODO 'accesParking' sera à remplacer par l'id de l'élément à tester
    const accesParking = document.getElementById('accesParking');
    accesParking.addEventListener('click', parkingAttribute);

    // TODO 'restauration' sera à remplacer par l'id de l'élément à tester
    const restauration = document.getElementById('restauration');
    restauration.addEventListener('click', restaurantAttribute);

    // TODO 'animal' sera à remplacer par l'id de l'élément à tester
    const animal = document.getElementById('animal');
    animal.addEventListener('click', animalsAttribute);

    // TODO 'herbe' sera à remplacer par l'id de l'élément à tester
    const herbe = document.getElementById('herbe');
    herbe.addEventListener('click', grassAttribute);

    // TODO 'verdure' sera à remplacer par l'id de l'élément à tester
    const verdure = document.getElementById('verdure');
    verdure.addEventListener('click', greeneryAttribute);

    // TODO 'piqueNique' sera à remplacer par l'id de l'élément à tester
    const crapa = document.getElementById('crapa');
    crapa.addEventListener('click', crapaAttribute);

    // TODO 'terrainSport' sera à remplacer par l'id de l'élément à tester
    const terrainSport = document.getElementById('terrainSport');
    terrainSport.addEventListener('click', sportAttribute);

    // TODO 'activite' sera à remplacer par l'id de l'élément à tester
    const activite = document.getElementById('activite');
    activite.addEventListener('click', activityAttribute);

    // TODO 'elementCulture' sera à remplacer par l'id de l'élément à tester
    const elementCulture = document.getElementById('elementCulture');
    elementCulture.addEventListener('click', cultureAttribute);
*/
    const searchData = document.getElementById('searchData');
    searchData.addEventListener('click', fetchData);

}

main();
