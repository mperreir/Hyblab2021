// SLIDE CHOIX BICLOO


let initSlideChoixBicloo = function () {

    d3.select('#fleche-droite-bycl').on('click', function () {
        overrideAnim({
            targets: '#fleche-droite-bycl',
            scale: 0
        });
        mySlidr.slide('choix-transport-4');
        initSlideChoixTransport();
    });

    d3.select('#fleche-droite-bycl').on('mouseover', function () {
        overrideAnim({
            targets: '#fleche-droite-bycl',
            scale: 1.2
        });
    });

    d3.select('#fleche-droite-bycl').on('mouseout', function () {
        overrideAnim({
            targets: '#fleche-droite-bycl',
            scale: 1
        });
    });

    d3.select('#fleche-gauche-bycl').on('click', function () {
        overrideAnim({
            targets: '#fleche-gauche-bycl',
            scale: 0
        });
        mySlidr.slide('choix-transport-2');
        initSlideChoixVelo();
    });

    d3.select('#fleche-gauche-bycl').on('mouseover', function () {
        overrideAnim({
            targets: '#fleche-gauche-bycl',
            scale: 1.2
        });
    });

    d3.select('#fleche-gauche-bycl').on('mouseout', function () {
        overrideAnim({
            targets: '#fleche-gauche-bycl',
            scale: 1
        });
    });

    /*====================Bouton du bas ===========================*/

    d3.select('#ok-button').on('click', function () {
        overrideAnim({
            targets: 'ok-button',
            scale: 0
        });
        mySlidr.slide('page-finale');
        initSlide2();
    });

    /*
    d3.select('#ok-button').on('mouseover', function () {
      overrideAnim({
        targets: '#ok-button',
        scale: 1.2
      });
  
    });
  
    d3.select('#ok-button').on('mouseout', function () {
      overrideAnim({
        targets: '#ok-button',
        scale: 1
      });
    });
    */

    d3.select('#plus-info').on('click', function () {
        overrideAnim({
            targets: '#plus-info',
            scale: 0
        });
        mySlidr.slide('page-finale');
        initSlide2();
    });
    /*
    d3.select('#plus-info').on('mouseover', function () {
      overrideAnim({
        targets: '#plus-info',
        scale: 1.2
      });
  
    });
  
    d3.select('#plus-info').on('mouseout', function () {
      overrideAnim({
        targets: '#plus-info',
        scale: 1
      });
    });
    */


};

// SLIDE CHOIX TRANSPORT EN COMMUN


let initSlideChoixTransport = function () {


    d3.select('#fleche-droite-trans').on('click', function () {
        overrideAnim({
            targets: '#fleche-droite-trans',
            scale: 0
        });
        mySlidr.slide('choix-transport-1');
        initSlideChoixVoiture();
    });

    d3.select('#fleche-droite-trans').on('mouseover', function () {
        overrideAnim({
            targets: '#fleche-droite-trans',
            scale: 1.2
        });
    });

    d3.select('#fleche-droite-trans').on('mouseout', function () {
        overrideAnim({
            targets: '#fleche-droite-trans',
            scale: 1
        });
    });

    d3.select('#fleche-gauche-trans').on('click', function () {
        overrideAnim({
            targets: '#fleche-gauche-trans',
            scale: 0
        });
        mySlidr.slide('choix-transport-3');
        initSlideChoixBicloo();
    });

    d3.select('#fleche-gauche-trans').on('mouseover', function () {
        overrideAnim({
            targets: '#fleche-gauche-trans',
            scale: 1.2
        });
    });

    d3.select('#fleche-gauche-trans').on('mouseout', function () {
        overrideAnim({
            targets: '#fleche-gauche-trans',
            scale: 1
        });
    });

    /*====================Bouton du bas ===========================*/

    d3.select('#ok-button').on('click', function () {
        overrideAnim({
            targets: 'ok-button',
            scale: 0
        });
        mySlidr.slide('page-finale');
        initSlide2();
    });
    /*
    d3.select('#ok-button').on('mouseover', function () {
      overrideAnim({
        targets: '#ok-button',
        scale: 1.2
      });
  
    });
  
    d3.select('#ok-button').on('mouseout', function () {
      overrideAnim({
        targets: '#ok-button',
        scale: 1
      });
    });
    */
    d3.select('#plus-info').on('click', function () {
        overrideAnim({
            targets: '#plus-info',
            scale: 0
        });
        mySlidr.slide('page-finale');
        initSlide2();
    });
    /*
    d3.select('#plus-info').on('mouseover', function () {
      overrideAnim({
        targets: '#plus-info',
        scale: 1.2
      });
  
    });
  
    d3.select('#plus-info').on('mouseout', function () {
      overrideAnim({
        targets: '#plus-info',
        scale: 1
      });
    });
    */

    /*======================= Changer de Image Transport ===========================*/

    d3.select('#transport').on('click', function () {
        changeImage(this);
    });
};

function changeImage(element) {
    const attr = element.getAttribute("src");

    if (attr === "assets/choix/transportCommun1.svg")
        element.setAttribute("src", "assets/choix/transportCommun2.svg");
    else if (attr === "assets/choix/transportCommun2.svg")
        element.setAttribute("src", "assets/choix/transportCommun3.svg");
    else if (attr === "assets/choix/transportCommun3.svg")
        element.setAttribute("src", "assets/choix/transportCommun1.svg");
    else
        element.setAttribute("src", "assets/choix/transportCommun2.svg");
}


// SLIDE CHOIX VELO


let initSlideChoixVelo = function () {

    d3.select('#fleche-droite-velo').on('click', function () {
        overrideAnim({
            targets: '#fleche-droite-velo',
            scale: 0
        });
        mySlidr.slide('choix-transport-3');
        initSlideChoixBicloo();
    });

    d3.select('#fleche-droite-velo').on('mouseover', function () {
        overrideAnim({
            targets: '#fleche-droite-velo',
            scale: 1.2
        });
    });

    d3.select('#fleche-droite-velo').on('mouseout', function () {
        overrideAnim({
            targets: '#fleche-droite-velo',
            scale: 1
        });

    });

    d3.select('#fleche-gauche-velo').on('click', function () {
        overrideAnim({
            targets: '#fleche-gauche-velo',
            scale: 0
        });
        mySlidr.slide('choix-transport-1');
        initSlideChoixVoiture();
    });

    d3.select('#fleche-gauche-velo').on('mouseover', function () {
        overrideAnim({
            targets: '#fleche-gauche-velo',
            scale: 1.2
        });

    });

    d3.select('#fleche-gauche-velo').on('mouseout', function () {
        overrideAnim({
            targets: '#fleche-gauche-velo',
            scale: 1
        });
    });

    /*====================Bouton du bas ===========================*/

    d3.select('#ok-button').on('click', function () {
        overrideAnim({
            targets: 'ok-button',
            scale: 0
        });
        mySlidr.slide('page-finale');
        initSlide2();
    });

    /*
    d3.select('#ok-button').on('mouseover', function () {
      overrideAnim({
        targets: '#ok-button',
        scale: 1.2
      });
  
    });
  
    d3.select('#ok-button').on('mouseout', function () {
      overrideAnim({
        targets: '#ok-button',
        scale: 1
      });
    });
    */

    d3.select('#plus-info').on('click', function () {
        overrideAnim({
            targets: '#plus-info',
            scale: 0
        });
        mySlidr.slide('page-finale');
        initSlide2();
    });
    /*
    d3.select('#plus-info').on('mouseover', function () {
      overrideAnim({
        targets: '#plus-info',
        scale: 1.2
      });
  
    });
  
    d3.select('#plus-info').on('mouseout', function () {
      overrideAnim({
        targets: '#plus-info',
        scale: 1
      });
    });
    */


};

// SLIDE CHOIX VOITURE

let initSlideChoixVoiture = function () {

    // bouton de droite
    d3.select('#fleche-droite-voit').on('click', function () {
        overrideAnim({
            targets: '#fleche-droite-voit',
            scale: 0
        });
        mySlidr.slide('choix-transport-2');
        initSlideChoixVelo();
    });

    d3.select('#fleche-droite-voit').on('mouseover', function () {
        overrideAnim({
            targets: '#fleche-droite-voit',
            scale: 1.2
        });

    });

    d3.select('#fleche-droite-voit').on('mouseout', function () {
        overrideAnim({
            targets: '#fleche-droite-voit',
            scale: 1
        });
    });

    // bouton de gauche
    d3.select('#fleche-gauche-voit').on('click', function () {
        overrideAnim({
            targets: '#fleche-gauche-voit',
            scale: 0
        });
        mySlidr.slide('choix-transport-4');
        console.log('avant init slide');
        initSlideChoixTransport();
        console.log('après init slide');
    });

    d3.select('#fleche-gauche-voit').on('mouseover', function () {
        overrideAnim({
            targets: '#fleche-gauche-voit',
            scale: 1.2
        });

    });

    d3.select('#fleche-gauche-voit').on('mouseout', function () {
        overrideAnim({
            targets: '#fleche-gauche-voit',
            scale: 1
        });
    });

    /*====================Bouton du bas ===========================*/

    d3.select('#ok-button').on('click', function () {
        overrideAnim({
            targets: 'ok-button',
            scale: 0
        });
        mySlidr.slide('page-finale');
        initSlide2();
    });
    /*
    d3.select('#ok-button').on('mouseover', function () {
      overrideAnim({
        targets: '#ok-button',
        scale: 1.2
      });
  
    });
  
    d3.select('#ok-button').on('mouseout', function () {
      overrideAnim({
        targets: '#ok-button',
        scale: 1
      });
    });
    */

    d3.select('#plus-info').on('click', function () {
        overrideAnim({
            targets: '#plus-info',
            scale: 0
        });
        mySlidr.slide('page-finale');
        initSlide2();
    });

    /*
    d3.select('#plus-info').on('mouseover', function () {
      overrideAnim({
        targets: '#plus-info',
        scale: 1.2
      });
  
    });
  
    d3.select('#plus-info').on('mouseout', function () {
      overrideAnim({
        targets: '#plus-info',
        scale: 1
      });
    });
  
    */
};
