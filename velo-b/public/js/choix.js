// SLIDE CHOIX BICLOO


let initSlideChoixBicloo = function () {
  
  /*==================== Fleches ===========================*/

  const idFlecheD = '#fleche-droite-bycl';
  const idFlecheG = '#fleche-gauche-bycl';
  const nextD = 'choix-transport-4';
  const nextG = 'choix-transport-2';
  arrowbutton(idFlecheD, nextD);
  arrowbutton(idFlecheG, nextG);

  /*====================Bouton du bas ===========================*/
  const infoChoix = 'infos-choix-bicloo';
  okbutton(infoChoix);
  infobutton();

};

// SLIDE CHOIX TRANSPORT EN COMMUN


let initSlideChoixTransport = function () {

  const idFlecheD = '#fleche-droite-trans';
  const idFlecheG = '#fleche-gauche-trans';
  const nextD = 'choix-transport-1';
  const nextG = 'choix-transport-3';
  arrowbutton(idFlecheD, nextD);
  arrowbutton(idFlecheG, nextG);



  /*====================Bouton du bas ===========================*/
  const infoChoix = 'infos-choix-transport';

  okbutton(infoChoix);
  infobutton();

  /*======================= Changer de Image Transport ===========================*/

  d3.select('#transport').on('click', function () {
    changeImage(this);
  });



};

// SLIDE CHOIX VELO

let initSlideChoixVelo = function () {

  /*==================== Fleches ===========================*/

  const idFlecheD = '#fleche-droite-velo';
  const idFlecheG = '#fleche-gauche-velo';
  const nextD = 'choix-transport-3';
  const nextG = 'choix-transport-1';
  arrowbutton(idFlecheD, nextD);
  arrowbutton(idFlecheG, nextG);

  /*====================Bouton du bas ===========================*/
  const infoChoix = 'infos-choix-velo';

  okbutton(infoChoix);
  infobutton();

};

// SLIDE CHOIX VOITURE

let initSlideChoixVoiture = function () {
  
   /*==================== Fleches ===========================*/

   const idFlecheD = '#fleche-droite-voit';
   const idFlecheG = '#fleche-gauche-voit';
   const nextD = 'choix-transport-2';
   const nextG = 'choix-transport-4';
   arrowbutton(idFlecheD, nextD);
   arrowbutton(idFlecheG, nextG);
 
   /*====================Bouton du bas ===========================*/
   const infoChoix = 'infos-selection-voiture'

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




