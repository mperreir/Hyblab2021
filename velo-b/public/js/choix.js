// SLIDE CHOIX BICLOO


registerSlide("choix-transport-bicloo", function () {
  
  /*==================== Fleches ===========================*/

  const idFlecheD = '#fleche-droite-bycl';
  const idFlecheG = '#fleche-gauche-bycl';
  const nextD = 'choix-transport-transports';
  const nextG = 'choix-transport-velo';
  arrowbutton(idFlecheD, nextD);
  arrowbutton(idFlecheG, nextG);

  //retour
  const idFlecheRetour = '#fleche-retour-bicl';
  const retour = 'page-carte';
  retourbutton(idFlecheRetour, retour);

  /*====================Bouton du bas ===========================*/
  d3.select('#plus-info-bicloo').on('click', function () {
    overrideAnim({
      targets: '#plus-info-bicloo',
      scale: 0
    });
    goToSlide('info-choix-bicloo');
  });

  const infoSelection = 'question-bicloo-autres-transports';
  const idOkButton = '#ok-bicloo';
  okbutton(idOkButton,infoSelection);
  infobutton();

});

// SLIDE CHOIX TRANSPORT EN COMMUN


registerSlide("choix-transport-transports", function () {

  const idFlecheD = '#fleche-droite-trans';
  const idFlecheG = '#fleche-gauche-trans';
  const nextD = 'choix-transport-voiture';
  const nextG = 'choix-transport-bicloo';
  arrowbutton(idFlecheD, nextD);
  arrowbutton(idFlecheG, nextG);

  //retour
  const idFlecheRetour = '#fleche-retour-trans';
  const retour = 'page-carte';
  retourbutton(idFlecheRetour, retour);


  /*====================Bouton du bas ===========================*/
  d3.select('#plus-info-transports').on('click', function () {
    overrideAnim({
      targets: '#plus-info-transports',
      scale: 0
    });
    goToSlide('info-choix-transports');
  });


  const infoSelection = 'question-transports-velo';
  const idOkButton = '#ok-transport';
  okbutton(idOkButton,infoSelection);
  infobutton();

  /*======================= Changer de Image Transport ===========================*/

  d3.select('#transport').on('click', function () {
    changeImage(this);
  });

  d3.select('#transport').on('click', function () {
    changeImage(this);
  });


});

// SLIDE CHOIX VELO

registerSlide("choix-transport-velo",function () {

  /*==================== Fleches ===========================*/

  const idFlecheD = '#fleche-droite-velo';
  const idFlecheG = '#fleche-gauche-velo';
  const nextD = 'choix-transport-bicloo';
  const nextG = 'choix-transport-voiture';
  arrowbutton(idFlecheD, nextD);
  arrowbutton(idFlecheG, nextG);
  
  //retour
  const idFlecheRetour = '#fleche-retour-velo';
  const retour = 'page-carte';
  retourbutton(idFlecheRetour, retour);

  /*====================Bouton du bas ===========================*/

  d3.select('#plus-info-velo').on('click', function () {
    overrideAnim({
      targets: ['#plus-info-velo'],
      scale: 0
    });
    goToSlide('info-choix-velo');
  });

  const infoSelection = 'question-velo-autres-transports';
  const idOkButton = '#ok-velo';
  okbutton(idOkButton,infoSelection);
  infobutton();

});

// SLIDE CHOIX VOITURE

registerSlide("choix-transport-voiture", function () {
  
   /*==================== Fleches ===========================*/

   const idFlecheD = '#fleche-droite-voit';
   const idFlecheG = '#fleche-gauche-voit';
   const nextD = 'choix-transport-velo';
   const nextG = 'choix-transport-transports';
   arrowbutton(idFlecheD, nextD);
   arrowbutton(idFlecheG, nextG);

   
  //retour
  const idFlecheRetour = '#fleche-retour-voit';
  const retour = 'page-carte';
  retourbutton(idFlecheRetour, retour);
 
   /*====================Bouton du bas ===========================*/

  
   d3.select('#plus-info-voiture').on('click', function () {
    overrideAnim({
      targets: '#plus-info-voiture',
      scale: 0
    });
    goToSlide('info-choix-voiture');
  });

  const infoSelection = 'question-voiture-velo';
  const idOkButton = '#ok-voiture';
  okbutton(idOkButton,infoSelection);
  infobutton();
});


let arrowbutton = function (idButton, page) {
  d3.select(idButton).on('click', function () {
    overrideAnim({
      targets: idButton,
      scale: 1
    });
    goToSlide(page);
  });

  d3.select(idButton).on('mouseover', function () {
    overrideAnim({
      targets: idButton,
      scale: 1.2
    });

  });

  d3.select(idButton).on('mouseout', function () {
    overrideAnim({
      targets: idButton,
      scale: 1
    });
  });

}

let okbutton = function (idbutton,page) {

  d3.select(idbutton).on('click', function () {
    overrideAnim({
      targets: idbutton,
      scale: 0
    });
    goToSlide(page);
  });

}

let infobutton = function (page) {
  d3.select('#plus-info').on('click', function () {
    overrideAnim({
      targets: '#plus-info',
      scale: 0
    });
    goToSlide('page-finale');
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



let retourbutton = function (idButton, page) {
  
  d3.select(idButton).on('click', function () {
    overrideAnim({
      targets: idButton,
      scale: 1
    });
    goToSlide(page);
  });

  d3.select(idButton).on('mouseover', function () {
    overrideAnim({
      targets: idButton,
      scale: 1.2
    });

  });

  d3.select(idButton).on('mouseout', function () {
    overrideAnim({
      targets: idButton,
      scale: 1
    });
  });

}
