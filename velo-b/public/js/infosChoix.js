/**
 * Ce fichier contient toutes les fonctions qui s'occupent des informations liés au choix d'un transport en commun
 */

/**
 * Cette fonction gère la slide avec les infos sur le vélo
 */
let initSlideInfosVelo = function () {
    d3.select('#close-btn-velo').on('click', function () {
        overrideAnim({
            targets: '#close-btn-velo',
            scale: 0
        });
        mySlidr.slide('choix-transport-2');
        initSlideChoixVelo();
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
}

/**
 * Cette fonction gère la slide avec les infos sur la voiture
 */
let initSlideInfosVoiture = function () {
    d3.select('#close-btn-voiture').on('click', function () {
        overrideAnim({
            targets: '#close-btn-voiture',
            scale: 0
        });
        mySlidr.slide('choix-transport-1');
        initSlideChoixVoiture();
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
}

/**
* Cette fonction gère la slide avec les infos sur le vélo
*/
let initSlideInfosBicloo = function () {
    d3.select('#close-btn-bicloo').on('click', function () {
        overrideAnim({
            targets: '#close-btn-bicloo',
            scale: 0
        });
        mySlidr.slide('choix-transport-3');
        initSlideChoixBicloo();
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
        const sum = stations.reduce((result,a)=> result+a.capacite_num, 0);
        //document.getElementById("bicloo-velos").innerText = sum;
    });

    fetchJsonData("api/disponibilites-bicloo", (dispos) => {
        const sum = dispos.reduce((result,a)=> result+a.available_bikes, 0);
        document.getElementById("bicloo-velos").innerText = sum;
    });
}

/**
 * Cette fonction gère la slide avec les infos sur le vélo
 */
let initSlideInfosTransports = function () {
    d3.select('#close-btn-transports').on('click', function () {
        overrideAnim({
            targets: '#close-btn-transports',
            scale: 0
        });
        mySlidr.slide('choix-transport-4');
        initSlideChoixTransport();
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
}
