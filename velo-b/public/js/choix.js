// SLIDE CHOIX BICLOO


let initSlideChoixBicloo = function () {
  
  /*==================== Fleches ===========================*/

  let idFlecheD = '#fleche-droite-bycl';
  let idFlecheG = '#fleche-gauche-bycl';
  let nextD = 'choix-transport-4';
  let nextG = 'choix-transport-2';
  arrowbutton(idFlecheD, nextD);
  arrowbutton(idFlecheG, nextG);

  /*====================Bouton du bas ===========================*/
  d3.select('#plus-info-bicloo').on('click', function () {
    anime({
      targets: '#plus-info-bicloo',
      scale: 0
    });
    mySlidr.slide('info-choix-bicloo');
    initSlideInfosBicloo();
  });


  let infoChoix = 'infos-choix-bicloo';
  okbutton(infoChoix);
  infobutton();

};

// SLIDE CHOIX TRANSPORT EN COMMUN


let initSlideChoixTransport = function () {

  let idFlecheD = '#fleche-droite-trans';
  let idFlecheG = '#fleche-gauche-trans';
  let nextD = 'choix-transport-1';
  let nextG = 'choix-transport-3';
  arrowbutton(idFlecheD, nextD);
  arrowbutton(idFlecheG, nextG);



  /*====================Bouton du bas ===========================*/
  d3.select('#plus-info-transports').on('click', function () {
    anime({
      targets: '#plus-info-transports',
      scale: 0
    });
    mySlidr.slide('info-choix-transports');
    initSlideInfosTransports();
  });

  let infoChoix = 'infos-choix-transport';

  okbutton(infoChoix);
  infobutton();

  /*======================= Changer de Image Transport ===========================*/

  d3.select('#transport').on('click', function () {
    changeImage(this);
  });


// SLIDE CHOIX VELO

};

// SLIDE CHOIX VELO

let initSlideChoixVelo = function () {

  /*==================== Fleches ===========================*/

  let idFlecheD = '#fleche-droite-velo';
  let idFlecheG = '#fleche-gauche-velo';
  let nextD = 'choix-transport-3';
  let nextG = 'choix-transport-1';
  arrowbutton(idFlecheD, nextD);
  arrowbutton(idFlecheG, nextG);

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
    d3.select('#plus-info-velo').on('click', function () {
      anime({
        targets: '#fleche-gauche-velo',
        targets: '#plus-info-velo',
        scale: 0
      });
      mySlidr.slide('choix-transport-1');
      initSlideChoixVoiture();
      mySlidr.slide('info-choix-velo');
      initSlideInfosVelo();
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
  
  const infoChoix = 'infos-choix-velo';
  okbutton(infoChoix);
  infobutton();
};

// SLIDE CHOIX VOITURE

let initSlideChoixVoiture = function () {
  
   /*==================== Fleches ===========================*/

   let idFlecheD = '#fleche-droite-voit';
   let idFlecheG = '#fleche-gauche-voit';
   let nextD = 'choix-transport-2';
   let nextG = 'choix-transport-4';
   arrowbutton(idFlecheD, nextD);
   arrowbutton(idFlecheG, nextG);
 
   /*====================Bouton du bas ===========================*/

   d3.select('#plus-info-voiture').on('click', function () {
    anime({
      targets: '#plus-info-voiture',
      scale: 0
    });
    mySlidr.slide('info-choix-voiture');
    initSlideInfosVoiture();
  });

   let infoChoix = 'infos-choix-voiture'

  okbutton(infoChoix);
  infobutton();
};


let arrowbutton = function (idButton, page) {
  d3.select(idButton).on('click', function () {
    anime({
      targets: idButton,
      scale: 0
    });
    mySlidr.slide(page);
    if (page == 'choix-transport-1') { //on va sur la page voiture
      initSlideChoixVoiture();
    }
    else if (page == 'choix-transport-2') { //on va sur la page velo
      initSlideChoixVelo();
    }
    else if (page == 'choix-transport-3') { //on va sur la page bicloo
      initSlideChoixBicloo();
    }
    else if (page == 'choix-transport-4') { //on va sur la page transport
      initSlideChoixTransport();
    }
  });

  d3.select(idButton).on('mouseover', function () {
    anime({
      targets: idButton,
      scale: 1.2
    });

  });

  d3.select(idButton).on('mouseout', function () {
    anime({
      targets: idButton,
      scale: 1
    });
  });

}

let okbutton = function (page) {

  d3.select('#ok-button').on('click', function () {
    anime({
      targets: 'ok-button',
      scale: 0
    });
    mySlidr.slide(page);
    if (page == 'infos-choix-voiture') {
      initSlideInfoChoixVoiture();
    }
    else if (page == 'infos-choix-velo') {
      initSlideInfoChoixVelo();
    }
    else if (page == 'infos-choix-bycloo') {
      initSlideInfoChoixBycloo();
    }
    else if (page == 'infos-choix-transport') {
      initSlideInfoChoixTransport();
    }
  });

}

let infobutton = function (page) {
  d3.select('#plus-info').on('click', function () {
    anime({
      targets: '#plus-info',
      scale: 0
    });
    mySlidr.slide('page-2');
    initSlide2();
  });
}


function changeImage(element) {
  var attr = element.getAttribute("src");

  if (attr == "assets/choix/transportCommun1.svg")
    element.setAttribute("src", "assets/choix/transportCommun2.svg");
  else if (attr == "assets/choix/transportCommun2.svg")
    element.setAttribute("src", "assets/choix/transportCommun3.svg");
  else if (attr == "assets/choix/transportCommun3.svg")
    element.setAttribute("src", "assets/choix/transportCommun1.svg");
  else
    element.setAttribute("src", "assets/choix/transportCommun3.svg");
}




