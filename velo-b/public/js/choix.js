// SLIDE CHOIX BICLOO


registerSlide("choix-transport-bicloo", function () {
  
  /*==================== Fleches ===========================*/
  arrowbutton('#fleche-gauche-bicl', 'gauche');
  arrowbutton('#fleche-droite-bicl', 'droite');
  retourbutton('#fleche-retour-bicl');

  /*====================Bouton du bas ===========================*/
  d3.select('#plus-info-bicloo').on('click', function () {
    overrideAnim({
      targets: '#plus-info-bicloo',
      scale: 0
    });
    goToNextSlide('info');
  });

  const infoSelection = 'question-bicloo-autres-transports';
  const idOkButton = '#ok-bicloo';
  okbutton(idOkButton,infoSelection);
  infobutton();

});

// SLIDE CHOIX TRANSPORT EN COMMUN


registerSlide("choix-transport-transports", function () {

  /*==================== Fleches ===========================*/
  arrowbutton('#fleche-gauche-trans', 'gauche');
  arrowbutton('#fleche-droite-trans', 'droite');
  retourbutton('#fleche-retour-trans');


  /*====================Bouton du bas ===========================*/
  d3.select('#plus-info-transports').on('click', function () {
    overrideAnim({
      targets: '#plus-info-transports',
      scale: 0
    });
    goToNextSlide('info');
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
  arrowbutton('#fleche-gauche-velo', 'gauche');
  arrowbutton('#fleche-droite-velo', 'droite');
  retourbutton('#fleche-retour-velo');

  /*====================Bouton du bas ===========================*/

  d3.select('#plus-info-velo').on('click', function () {
    overrideAnim({
      targets: ['#plus-info-velo'],
      scale: 0
    });
    goToNextSlide('info');
  });

  const infoSelection = 'question-velo-autres-transports';
  const idOkButton = '#ok-velo';
  okbutton(idOkButton,infoSelection);
  infobutton();

});

// SLIDE CHOIX VOITURE

registerSlide("choix-transport-voiture", function () {
  
   /*==================== Fleches ===========================*/

  /*==================== Fleches ===========================*/
  arrowbutton('#fleche-gauche-voit', 'gauche');
  arrowbutton('#fleche-droite-voit', 'droite');
  retourbutton('#fleche-retour-voit');
 
   /*====================Bouton du bas ===========================*/

  
   d3.select('#plus-info-voiture').on('click', function () {
    overrideAnim({
      targets: '#plus-info-voiture',
      scale: 0
    });
     goToNextSlide('info');
  });

  const infoSelection = 'question-voiture-velo';
  const idOkButton = '#ok-voiture';
  okbutton(idOkButton,infoSelection);
  infobutton();
});

let arrowbutton = function (idButton, choice) {
  d3.select(idButton).on('click', function () {
    overrideAnim({
      targets: idButton,
      scale: 1
    });
    goToNextSlide(choice);
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
    goToNextSlide("ok");
  });
}

let infobutton = function (page) {
  d3.select('#plus-info').on('click', function () {
    overrideAnim({
      targets: '#plus-info',
      scale: 0
    });
    goToNextSlide('info');
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
    goToNextSlide('retour');
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
