/**
 * Ce fichier contient toutes les fonctions qui s'occupent des informations liés au choix d'un transport en commun
 */

/**
 * Cette fonction gère la slide avec les infos sur le vélo
 */
let initSlideInfosVelo = function () {
    d3.select('#close-btn-velo').on('click', function () {
        anime({
            targets: '#close-btn-velo',
            scale: 0
        });
        mySlidr.slide('choix-transport-2');
        initSlideChoixVelo();
    });
}

/**
 * Cette fonction gère la slide avec les infos sur la voiture
 */
let initSlideInfosVoiture = function () {

}

/**
* Cette fonction gère la slide avec les infos sur le vélo
*/
let initSlideInfosBicloo = function () {

}

/**
 * Cette fonction gère la slide avec les infos sur le vélo
 */
let initSlideInfosTransports = function () {

}
