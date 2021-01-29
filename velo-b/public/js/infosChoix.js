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
        goToSlide('choix-transport-2');
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
        goToSlide('choix-transport-1');
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
        goToSlide('choix-transport-3');
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
});

/**
 * Cette fonction gère la slide avec les infos sur le vélo
 */
registerSlide("info-choix-transports", function () {
    d3.select('#close-btn-transports').on('click', function () {
        overrideAnim({
            targets: '#close-btn-transports',
            scale: 0
        });
        goToSlide('choix-transport-4');
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
});
