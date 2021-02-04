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
    "Jeux pour enfants": false,
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
    "CRAPA": false,
    "Terrains de sport": false,
    "Activités organisées": false,
    "Élément de culture": false,
    "Poubelles": null,
    "Horaires d'ouverture": 1,
    "Âge": []
};


// L'heure + les 5 checkbox qui sont initialisé à true de base
let nbElemChoisit = 6;


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


function childGameAttribute(event) {
    myCriteria["Jeux pour enfants"] = event.target.checked;
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


async function fetchData() {

    // Récupé les données sur tous les jardins
    const json = await fetch('data/jardins.json', {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(async json => {

            if (myCriteria["Géolocalisation"].lat && myCriteria["Géolocalisation"].lng) {

                const geolocations = json.map(line => line["Géolocalisation"]);
                const service = new google.maps.DistanceMatrixService();
                const origin = new google.maps.LatLng(myCriteria["Géolocalisation"].lat, myCriteria["Géolocalisation"].lng);
                const destinations1 = [];

                geolocations.forEach(x => {
                    const latLng = x.split(',');
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


                await destinations.forEach((x, i) => {
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
                                    json[25 * i + j]["Distances"].reel = distance;
                                    json[25 * i + j]["Distances"].duration = duration;
                                    const validDistance = (myCriteria["Distances"].max >= distance);
                                    json[25 * i + j]["Distances"].valid = validDistance;
                                    if (validDistance) {
                                        json[25 * i + j]["nbElemCorrect"]++;
                                        json[25 * i + j]["listElemMatch"].push("Distances");
                                    } else json[25 * i + j]["nbElemCorrect"] = -100;
                                }
                            }
                        }
                    });
                });
            }
            return json;
        });

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
                                    line["nbElemCorrect"] = line["nbElemCorrect"] + 1 / length;
                                    add = true;
                                } else {
                                    if (age > maxAge) {
                                        line["nbElemCorrect"] = line["nbElemCorrect"] + (1 - (age - maxAge) / maxAge).toFixed(2) / length;
                                    } else {
                                        line["nbElemCorrect"] = line["nbElemCorrect"] + (1 - (minAge - age) / minAge).toFixed(2) / length;
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
                        } else line["nbElemCorrect"] -= 100;
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
            line.affinity = Math.round(line.affinity);
        }

        // Tri des jardins par affinité décroissante
        json.sort((a,b)=> {
            if (b.affinity === a.affinity) return a["Distances"].reel - b["Distances"].reel;
            else return b.affinity - a.affinity;
        });

        // Récupération des 3 meilleurs
        const top = json.slice(0, 3);

        const perc1 = document.getElementById('result-one-percentage');
        const perc2 = document.getElementById('result-two-percentage');
        const perc3 = document.getElementById('result-three-percentage');
        perc1.innerText = top[0]['affinity'] + '%';
        perc2.innerText = top[1]['affinity'] + '%';
        perc3.innerText = top[2]['affinity'] + '%';

        const name1 = document.getElementById('result-one-name');
        const name2 = document.getElementById('result-two-name');
        const name3 = document.getElementById('result-three-name');
        name1.innerText = top[0]['Nom'];
        name2.innerText = top[1]['Nom'];
        name3.innerText = top[2]['Nom'];
        const url1 = top[0]['Web'] === null ? 'https://jardins.nantes.fr/' : top[0]['Web'];
        const url2 = top[1]['Web'] === null ? 'https://jardins.nantes.fr/' : top[1]['Web'];
        const url3 = top[2]['Web'] === null ? 'https://jardins.nantes.fr/' : top[2]['Web'];
        name1.href = url1;
        name2.href = url2;
        name3.href = url3;

        const address1 = document.getElementById('result-one-address');
        const address2 = document.getElementById('result-two-address');
        const address3 = document.getElementById('result-three-address');
        address1.innerHTML = '<img src="img/results_page/address.svg" alt="Icone d\'adresse">' + ' ' + top[0]['Adresse'];
        address2.innerHTML = '<img src="img/results_page/address.svg" alt="Icone d\'adresse">' + ' ' + top[1]['Adresse'];
        address3.innerHTML = '<img src="img/results_page/address.svg" alt="Icone d\'adresse">' + ' ' + top[2]['Adresse'];
        address1.href = 'https://www.google.fr/maps/@' + top[0]['Géolocalisation'] + ',18z';
        address2.href = 'https://www.google.fr/maps/@' + top[1]['Géolocalisation'] + ',18z';
        address3.href = 'https://www.google.fr/maps/@' + top[2]['Géolocalisation'] + ',18z';

        const access1 = document.getElementById('result-one-access');
        const access2 = document.getElementById('result-two-access');
        const access3 = document.getElementById('result-three-access');
        const tram1 = top[0]['Accès transports en commun'] === null ? "Pas d'information" : top[0]['Accès transports en commun'];
        const tram2 = top[1]['Accès transports en commun'] === null ? "Pas d'information" : top[1]['Accès transports en commun'];
        const tram3 = top[2]['Accès transports en commun'] === null ? "Pas d'information" : top[2]['Accès transports en commun'];
        access1.innerHTML = '<img src="img/results_page/tram.svg" alt="Icone d\'accès">' + ' ' + tram1;
        access2.innerHTML = '<img src="img/results_page/tram.svg" alt="Icone d\'accès">' + ' ' + tram2;
        access3.innerHTML = '<img src="img/results_page/tram.svg" alt="Icone d\'accès">' + ' ' + tram3;

        const time1 = document.getElementById('result-one-time');
        const time2 = document.getElementById('result-two-time');
        const time3 = document.getElementById('result-three-time');
        const horaire1 = top[0]['Horaires d\'ouverture'] === "00h01-23h59" ? "Ouvert 24h/24h" : top[0]['Horaires d\'ouverture'];
        const horaire2 = top[1]['Horaires d\'ouverture'] === "00h01-23h59" ? "Ouvert 24h/24h" : top[1]['Horaires d\'ouverture'];
        const horaire3 = top[2]['Horaires d\'ouverture'] === "00h01-23h59" ? "Ouvert 24h/24h" : top[2]['Horaires d\'ouverture'];
        time1.innerHTML = '<img src="img/results_page/time.svg" alt="Icone d\'ouverture">' + ' ' + horaire1;
        time2.innerHTML = '<img src="img/results_page/time.svg" alt="Icone d\'ouverture">' + ' ' + horaire2;
        time3.innerHTML = '<img src="img/results_page/time.svg" alt="Icone d\'ouverture">' + ' ' + horaire3;

        const location1 = document.getElementById('result-one-location');
        const location2 = document.getElementById('result-two-location');
        const location3 = document.getElementById('result-three-location');
        location1.href = 'https://www.google.fr/maps/@' + top[0]['Géolocalisation'] + ',18z';
        location2.href = 'https://www.google.fr/maps/@' + top[1]['Géolocalisation'] + ',18z';
        location3.href = 'https://www.google.fr/maps/@' + top[2]['Géolocalisation'] + ',18z';

        const moreInfo1 = document.getElementById('result-one-more-info-text');
        const moreInfo2 = document.getElementById('result-two-more-info-text');
        const moreInfo3 = document.getElementById('result-three-more-info-text');
        moreInfo1.innerText = top[0]['Informations complémentaires'];
        moreInfo2.innerText = top[1]['Informations complémentaires'];
        moreInfo3.innerText = top[2]['Informations complémentaires'];

        let slider1 = document.getElementById("splide-one-inside");
        let slider2 = document.getElementById("splide-two-inside");
        let slider3 = document.getElementById("splide-three-inside");
        slider1.innerHTML = '';
        slider2.innerHTML = '';
        slider3.innerHTML = '';

        for (const [key, value] of Object.entries(top[0])) {
            if (value === true){
                if (key === "Accessibilité Handicapé") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_disabled_picto.svg"></li>';
                if (key === "Accès Parking") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_parking_picto.svg"></li>';
                if (key === "Accès transports en commun") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_tram_picto.svg"></li>';
                if (key === "Activités organisées") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_activities_picto.svg"></li>';
                if (key === "Bancs") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_bench_picto.svg"></li>';
                if (key === "CRAPA") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_crapa_picto.svg"></li>';
                if (key === "Chiens autorisés") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_dog_picto.svg"></li>';
                if (key === "Herbe (un minimum) / Sable") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_grass_picto.svg"></li>';
                if (key === "Jardin clos") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_fence_picto.svg"></li>';
                if (key === "Jeux pour enfants") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_games_picto.svg"></li>';
                if (key === "Point d'eau") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_pond_picto.svg"></li>';
                if (key === "Présence d'animaux") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_animals_picto.svg"></li>';
                if (key === "Restauration") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_restaurant_picto.svg"></li>';
                if (key === "Sanitaires") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_wc_picto.svg"></li>';
                if (key === "Table pique-nique") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_table_picto.svg"></li>';
                if (key === "Terrains de sport") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_sport_field_picto.svg"></li>';
                if (key === "Verdure / Plante Espace Vert") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_tree_picto.svg"></li>';
                if (key === "Élément de culture") slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_statue_picto.svg"></li>';
            }
        }

        for (const [key, value] of Object.entries(top[1])) {
            if (value === true){
                if (key === "Accessibilité Handicapé") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_disabled_picto.svg"></li>';
                if (key === "Accès Parking") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_parking_picto.svg"></li>';
                if (key === "Accès transports en commun") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_tram_picto.svg"></li>';
                if (key === "Activités organisées") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_activities_picto.svg"></li>';
                if (key === "Bancs") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_bench_picto.svg"></li>';
                if (key === "CRAPA") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_crapa_picto.svg"></li>';
                if (key === "Chiens autorisés") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_dog_picto.svg"></li>';
                if (key === "Herbe (un minimum) / Sable") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_grass_picto.svg"></li>';
                if (key === "Jardin clos") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_fence_picto.svg"></li>';
                if (key === "Jeux pour enfants") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_games_picto.svg"></li>';
                if (key === "Point d'eau") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_pond_picto.svg"></li>';
                if (key === "Présence d'animaux") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_animals_picto.svg"></li>';
                if (key === "Restauration") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_restaurant_picto.svg"></li>';
                if (key === "Sanitaires") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_wc_picto.svg"></li>';
                if (key === "Table pique-nique") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_table_picto.svg"></li>';
                if (key === "Terrains de sport") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_sport_field_picto.svg"></li>';
                if (key === "Verdure / Plante Espace Vert") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_tree_picto.svg"></li>';
                if (key === "Élément de culture") slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_statue_picto.svg"></li>';
            }
        }

        for (const [key, value] of Object.entries(top[2])) {
            if (value === true){
                if (key === "Accessibilité Handicapé") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_disabled_picto.svg"></li>';
                if (key === "Accès Parking") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_parking_picto.svg"></li>';
                if (key === "Accès transports en commun") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_tram_picto.svg"></li>';
                if (key === "Activités organisées") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_activities_picto.svg"></li>';
                if (key === "Bancs") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_bench_picto.svg"></li>';
                if (key === "CRAPA") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_crapa_picto.svg"></li>';
                if (key === "Chiens autorisés") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_dog_picto.svg"></li>';
                if (key === "Herbe (un minimum) / Sable") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_grass_picto.svg"></li>';
                if (key === "Jardin clos") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_fence_picto.svg"></li>';
                if (key === "Jeux pour enfants") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_games_picto.svg"></li>';
                if (key === "Point d'eau") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_pond_picto.svg"></li>';
                if (key === "Présence d'animaux") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_animals_picto.svg"></li>';
                if (key === "Restauration") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_restaurant_picto.svg"></li>';
                if (key === "Sanitaires") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_wc_picto.svg"></li>';
                if (key === "Table pique-nique") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_table_picto.svg"></li>';
                if (key === "Terrains de sport") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_sport_field_picto.svg"></li>';
                if (key === "Verdure / Plante Espace Vert") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_tree_picto.svg"></li>';
                if (key === "Élément de culture") slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_statue_picto.svg"></li>';
            }
        }

        slider1.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_bin_picto.svg"></li>';
        slider2.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_bin_picto.svg"></li>';
        slider3.innerHTML += '<li class="splide__slide"><img class="icon-slider" src="img/common/pictograms/small/small_bin_picto.svg"></li>';


        new Splide( '#splide-one', {
            width: "99%",
            type : 'loop',
            perPage: 5,
            perMove: 5,
            focus  : 'center',
            heightRatio: 0.19,
            arrows: false,
            pagination: false,
            autoplay: true,
            speed: 25000,
            rewind: false,
            interval: 0,
            cover: true,
            gap: '0.3vw',
            easing: 'linear',
        }).mount();

        new Splide( '#splide-two', {
            width: "99%",
            type : 'loop',
            perPage: 5,
            perMove: 5,
            focus  : 'center',
            heightRatio: 0.19,
            arrows: false,
            pagination: false,
            autoplay: true,
            speed: 25000,
            rewind: false,
            interval: 0,
            cover: true,
            gap: '0.3vw',
            easing: 'linear',
        }).mount();

        new Splide( '#splide-three', {
            width: "99%",
            type : 'loop',
            perPage: 5,
            perMove: 5,
            focus  : 'center',
            heightRatio: 0.19,
            arrows: false,
            pagination: false,
            autoplay: true,
            speed: 25000,
            rewind: false,
            interval: 0,
            cover: true,
            gap: '0.3vw',
            easing: 'linear',
        }).mount();
        return json;
}


function main() {

    const dist = document.getElementById('localize-range');
    dist.addEventListener('input', distAttribute);

    // Bouton peu importe dans la page adresse
    const removeGeo = document.getElementById('removeGeo');
    removeGeo.addEventListener('click', noGeoAttribute);

    // Colonne true pour la page Accès
    const yesAccess = document.getElementById('yes-access');
    yesAccess.ondrop = dropYesAccess;

    // Colonne false pour la page Accès
    const noAccess = document.getElementById('no-access');
    noAccess.ondrop = dropNoAccess;

    // Colonne null pour la page Accès
    const nullAccess = document.getElementById('null-access');
    nullAccess.ondrop = dropNullAccess;

    // Colonne true pour la page Faune et flore
    const yesFlora = document.getElementById('yes-flora');
    yesFlora.ondrop = dropYesFlora;

    // Colonne false pour la page Faune et flore
    const noFlora = document.getElementById('no-flora');
    noFlora.ondrop = dropNoFlora;

    // Colonne null pour la page Faune et flore
    const nullFlora = document.getElementById('null-flora');
    nullFlora.ondrop = dropNullFlora;

    // Crapa page activité
    const crapa = document.getElementById('crapa-input');
    crapa.addEventListener('change', crapaAttribute);

    // Games pour enfant page activité
    const jeuxEnfant = document.getElementById('games-input');
    jeuxEnfant.addEventListener('change', childGameAttribute);

    // Terrain Sport page activité
    const terrainSport = document.getElementById('sport-field-input');
    terrainSport.addEventListener('change', sportAttribute);

    // Activite organisées page activité
    const activite = document.getElementById('activities-input');
    activite.addEventListener('change', activityAttribute);

    // Element culturels page activité
    const elementCulture = document.getElementById('statue-input');
    elementCulture.addEventListener('click', cultureAttribute);

    // Bontoun qui enclanche le calcul des meilleurs parcs
    const searchData = document.getElementById('searchData');
    searchData.addEventListener('click', fetchData);
}

// Initialisation des scripts des évènements
main();
