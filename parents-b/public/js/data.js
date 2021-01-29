'use strict';

let myCriteria = {
    "Géolocalisation": {
        lat: null,
        lng: null
    },
    "Distances" : {
        max: 10
    },
    "Accès transports en commun": null,
    "Gardien": null,
    "Jeux pour enfants": true,
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
    "CRAPA": true,
    "Terrains de sport": true,
    "Activités organisées": true,
    "Élément de culture": true,
    "Poubelles": null,
    "Horaires d'ouverture": 1,
    "Âge": []
};

// L'heure + les 5 checkbox qui sont initialisé à true de base
let nbElemChoisit = 6;

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

function updateHour(newHour) {
    myCriteria["Horaires d'ouverture"] = newHour;
}

function addAge(newAge) {
    if (myCriteria["Âge"].length === 0) nbElemChoisit++;
    myCriteria["Âge"].push(newAge);
}

function removeAge(rmAge) {
    if (myCriteria["Âge"].length === 1) nbElemChoisit--;
    myCriteria["Âge"].splice(myCriteria["Âge"].indexOf(rmAge), 1);
}

function distAttribute(event) {
    myCriteria["Distances"].max = parseInt(event.target.value);
}

function geoAttribute(latitude, longitude) {
    const geo = myCriteria["Géolocalisation"];
    if (!geo.lat && !geo.lng) nbElemChoisit++;
    myCriteria["Géolocalisation"].lat = parseFloat(latitude).toFixed(9);
    myCriteria["Géolocalisation"].lng = parseFloat(longitude).toFixed(9);
}

function noGeoAttribute(event) {
    if (myCriteria["Géolocalisation"].lat) {
        myCriteria["Géolocalisation"].lat = null;
        myCriteria["Géolocalisation"].lng = null;
        nbElemChoisit--;
    }
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
    event.preventDefault();
    const gard = myCriteria["Gardien"];
    myCriteria["Gardien"] = choiceUpdate(event.target.value, gard);
}

function childGameAttribute(event) {
    myCriteria["Jeux pour enfants"] = event.target.checked;
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
    myCriteria["CRAPA"] = event.target.checked;
}

function sportAttribute(event) {
    myCriteria["Terrains de sport"] = event.target.checked;
}

function activityAttribute(event) {
    myCriteria["Activités organisées"] = event.target.checked;
}

function cultureAttribute(event) {
    myCriteria["Élément de culture"] = event.target.checked;
}


function dropYesAccess(event, ui) {
    if (ui.draggable[0].id !== "Poubelles") {
        verifyNbElem(myCriteria[ui.draggable[0].id], true);
        myCriteria[ui.draggable[0].id] = true;
    }
}

function dropNoAccess(event, ui) {
    if (ui.draggable[0].id !== "Poubelles") {
        verifyNbElem(myCriteria[ui.draggable[0].id], true);
        myCriteria[ui.draggable[0].id] = false;
    }
}

function dropNullAccess(event, ui) {
    if (ui.draggable[0].id !== "Poubelles") {
        verifyNbElem(myCriteria[ui.draggable[0].id], false);
        myCriteria[ui.draggable[0].id] = null;
    }
}

function dropYesFlora(event, ui) {
    verifyNbElem(myCriteria[ui.draggable[0].id], true);
    myCriteria[ui.draggable[0].id] = true;
}

function dropNoFlora(event, ui) {
    verifyNbElem(myCriteria[ui.draggable[0].id], true);
    myCriteria[ui.draggable[0].id] = false;
}

function dropNullFlora(event, ui) {
    verifyNbElem(myCriteria[ui.draggable[0].id], false);
    myCriteria[ui.draggable[0].id] = null;
}

function verifyNbElem(value, nbElemCount) {
    if (nbElemCount) {
        if (value === null) nbElemChoisit++;
    } else {
        if (value !== null) nbElemChoisit--;
    }
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
                                    const validDistance = (myCriteria["Distances"].max >= distance);
                                    json[25*i + j]["Distances"]["valid"] = validDistance;
                                    if (validDistance) {
                                        json[25*i + j]["nbElemCorrect"]++;
                                        json[25*i + j]["listElemMatch"].push("Distances");
                                    }
                                }
                            }
                        }
                    });
                });
            }
            return json;
        })
        .then(json => {
            for (const line of json) {
                for (const [key, value] of Object.entries(line)) {
                    switch (key) {
                        case "Géolocalisation":
                            break;
                        case "Distances":
                            break;
                        case "Âge":
                            const length = myCriteria["Âge"].length;
                            if (value && length > 0) {
                                let add = false;
                                myCriteria["Âge"].forEach(age => {
                                    const ages = line["Âge"].split('-');
                                    const minAge = parseInt(ages[0]);
                                    const maxAge = parseInt(ages[1]);
                                    if (minAge <= age && age <= maxAge) {
                                        line["nbElemCorrect"] = line["nbElemCorrect"] + 1/length;
                                        add = true;
                                    } else {
                                        if (age > maxAge) {
                                            line["nbElemCorrect"] = line["nbElemCorrect"] + (1 - (age-maxAge)/maxAge).toFixed(2)/length;
                                        } else {
                                            line["nbElemCorrect"] = line["nbElemCorrect"] + (1 - (minAge-age)/minAge).toFixed(2)/length;
                                        }
                                    }
                                });
                                if (add) line["listElemMatch"].push(key);
                            }
                            break;
                        case "Horaires d'ouverture":
                            const splitHour = value.split('-');
                            const minHour = parseInt(splitHour[0].split('H')[0]);
                            const maxHour = parseInt(splitHour[1].split('H')[0]);
                            if (myCriteria[key] === 1) {
                                line["nbElemCorrect"]++;
                                line["listElemMatch"].push(key);
                            } else if (myCriteria[key] === 0 && minHour < 9) {
                                line["nbElemCorrect"]++;
                                line["listElemMatch"].push(key);
                            } else if (myCriteria[key] === 2 && maxHour > 19) {
                                line["nbElemCorrect"]++;
                                line["listElemMatch"].push(key);
                            }
                            break;
                        case "Accès transports en commun":
                            if (myCriteria[key] !== null && ((myCriteria[key] && value) || (!myCriteria[key] && value === null))) {
                                line["nbElemCorrect"]++;
                                line["listElemMatch"].push(key);
                            }
                            break;
                        default:
                            if (myCriteria[key] !== null && myCriteria[key] === value) {
                                line["nbElemCorrect"]++;
                                line["listElemMatch"].push(key);
                            }
                            break;
                    }
                }
                line.affinity = (line["nbElemCorrect"] * 100) / nbElemChoisit;
            }
            console.log(myCriteria);
            console.log(json);
            // Tri des jardins par affinité décroissante
            json.sort((a,b)=> b.affinity - a.affinity);
            console.log(nbElemChoisit);
            // Récupération des 3 meilleurs
            const top = json.slice(0, 3);
            console.log(top);
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

    const yesAccess = document.getElementById('yes-access');
    yesAccess.ondrop = dropYesAccess;

    const noAccess = document.getElementById('no-access');
    noAccess.ondrop = dropNoAccess;

    const nullAccess = document.getElementById('null-access');
    nullAccess.ondrop = dropNullAccess;

    const yesFlora = document.getElementById('yes-flora');
    yesFlora.ondrop = dropYesFlora;

    const noFlora = document.getElementById('no-flora');
    noFlora.ondrop = dropNoFlora;

    const nullFlora = document.getElementById('null-flora');
    nullFlora.ondrop = dropNullFlora;

    // Crapa
    const crapa = document.getElementById('crapa-input');
    crapa.addEventListener('change', crapaAttribute);

    // Games
    const jeuxEnfant = document.getElementById('games-input');
    jeuxEnfant.addEventListener('change', childGameAttribute);

    // Sport
    const terrainSport = document.getElementById('sport-field-input');
    terrainSport.addEventListener('change', sportAttribute);

    // Activite
    const activite = document.getElementById('activities-input');
    activite.addEventListener('change', activityAttribute);

    // element culturels
    const elementCulture = document.getElementById('statue-input');
    elementCulture.addEventListener('click', cultureAttribute);

    const searchData = document.getElementById('searchData');
    searchData.addEventListener('click', fetchData);

}

main();
