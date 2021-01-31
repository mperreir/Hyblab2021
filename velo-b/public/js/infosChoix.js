/**
 * Ce fichier contient toutes les fonctions qui s'occupent des informations liés au choix d'un transport en commun
 */

/**
 * Cette fonction gère la slide avec les infos sur le vélo
 */
registerSlide("info-choix-velo", function () {
    d3.select('#close-btn-velo').on('click', function () {
        overrideAnim({
            targets: '#close-btn-velo',
            scale: 0
        });
        goToNextSlide('ok');
    });

    d3.select('#close-btn-velo').on('mouseover', function () {
        overrideAnim({
            targets: '#close-btn-velo',
            scale: 1.2
        });
    });

    d3.select('#close-btn-velo').on('mouseout', function () {
        overrideAnim({
            targets: '#close-btn-velo',
            scale: 1
        });
    });

    fetchJsonData("api/abris-velo", (abris) => {
        const sum = abris.reduce((result,a)=> result+a.capacite, 0);
        document.getElementById("velo-parking-places").innerText = sum;
    });
    fetchJsonData("api/abris-velo/"+window.results.quartier, (abris) => {
        const sum = abris.reduce((result,a)=> result+a.capacite, 0);
        document.getElementById("velo-parking-places-zone").innerText = sum;
    });
});

/**
 * Cette fonction gère la slide avec les infos sur la voiture
 */
registerSlide("info-choix-voiture", function () {
    d3.select('#close-btn-voiture').on('click', function () {
        overrideAnim({
            targets: '#close-btn-voiture',
            scale: 0
        });
        goToNextSlide('ok');
    });

    d3.select('#close-btn-voiture').on('mouseover', function () {
        overrideAnim({
            targets: '#close-btn-voiture',
            scale: 1.2
        });
    });

    d3.select('#close-btn-voiture').on('mouseout', function () {
        overrideAnim({
            targets: '#close-btn-voiture',
            scale: 1
        });
    });

    fetchJsonData("api/disponibilites-places-parking", (dispos) => {
        const sum = dispos.reduce((result,d)=> result+d.grp_exploitation, 0);
        document.getElementById("voiture-parking-places").innerText = sum;
        document.getElementById("voiture-parking-ouvrage").innerText = dispos.length;
        document.getElementById("voiture-parking-enclos").innerText = 0;
    });
});

/**
 * Cette fonction gère la slide avec les infos sur le vélo
 */
registerSlide("info-choix-bicloo", function () {
    d3.select('#close-btn-bicloo').on('click', function () {
        overrideAnim({
            targets: '#close-btn-bicloo',
            scale: 0
        });
        goToNextSlide('ok');
    });

    d3.select('#close-btn-bicloo').on('mouseover', function () {
        overrideAnim({
            targets: '#close-btn-bicloo',
            scale: 1.2
        });
    });

    d3.select('#close-btn-bicloo').on('mouseout', function () {
        overrideAnim({
            targets: '#close-btn-bicloo',
            scale: 1
        });
    });

    fetchJsonData("api/stations-velo-libre-service", (stations) => {
        document.getElementById("bicloo-stations").innerText = stations.length;
    });
    fetchJsonData("api/disponibilites-bicloo", (dispos) => {
        const sum = dispos.reduce((result,a)=> result+a.available_bikes, 0);
        document.getElementById("bicloo-velos").innerText = sum;
    });
    fetchJsonData("api/stations-velo-libre-service/" + window.results.quartier, (stations) => {
        document.getElementById("bicloo-stations-zone").innerText = stations.length;
    });
    fetchJsonData("api/disponibilites-bicloo/" + window.results.quartier, (dispos) => {
        const sum = dispos.reduce((result,a)=> result+a.available_bikes, 0);
        document.getElementById("bicloo-velos-zone").innerText = sum;
    });
});

/**
 * Cette fonction gère la slide avec les infos sur les transports en commun
 */
registerSlide("info-choix-transports", function () {
    d3.select('#close-btn-transports').on('click', function () {
        overrideAnim({
            targets: '#close-btn-transports',
            scale: 0
        });
        goToNextSlide('ok');
    });

    d3.select('#close-btn-transports').on('mouseover', function () {
        overrideAnim({
            targets: '#close-btn-transports',
            scale: 1.2
        });
    });

    d3.select('#close-btn-transports').on('mouseout', function () {
        overrideAnim({
            targets: '#close-btn-transports',
            scale: 1
        });
    });

    fetchJsonData("api/arrets-tan", (arrets) => {
        console.log(arrets.filter(a => a.parent_station == undefined));
        document.getElementById("commun-arrets").innerText = arrets.filter(a => a.parent_station == undefined).length;
    });
    fetchJsonData("api/arrets-tan/" + window.results.quartier, (arrets) => {
        console.log(arrets.filter(a => a.parent_station == undefined));
        document.getElementById("commun-arrets-zone").innerText = arrets.filter(a => a.parent_station == undefined).length;
    });
});
