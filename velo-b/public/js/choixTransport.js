// SLIDE CHOIX TRANSPORT EN COMMUN


let initSlideChoixTransport = function () {


  d3.select('#fleche-droite-trans').on('click', function () {
    anime({
      targets: '#fleche-droite-trans',
      scale: 0
    });
    mySlidr.slide('choix-transport-1');
    initSlideChoixVoiture();
  });

  d3.select('#fleche-droite-trans').on('mouseover', function () {
    anime({
      targets: '#fleche-droite-trans',
      scale: 1.2
    });

  });

  d3.select('#fleche-droite-trans').on('mouseout', function () {
    anime({
      targets: '#fleche-droite-trans',
      scale: 1
    });
  });

  d3.select('#fleche-gauche-trans').on('click', function () {
    anime({
      targets: '#fleche-gauche-trans',
      scale: 0
    });
    mySlidr.slide('choix-transport-3');
    initSlideChoixBicloo();
  });

  d3.select('#fleche-gauche-trans').on('mouseover', function () {
    anime({
      targets: '#fleche-gauche-trans',
      scale: 1.2
    });

  });

  d3.select('#fleche-gauche-trans').on('mouseout', function () {
    anime({
      targets: '#fleche-gauche-trans',
      scale: 1
    });
  });

  /*====================Bouton du bas ===========================*/

  d3.select('#ok-button').on('click', function () {
    anime({
      targets: 'ok-button',
      scale: 0
    });
    mySlidr.slide('page-2');
    initSlide2();
  });
  /*
  d3.select('#ok-button').on('mouseover', function () {
    anime({
      targets: '#ok-button',
      scale: 1.2
    });

  });

  d3.select('#ok-button').on('mouseout', function () {
    anime({
      targets: '#ok-button',
      scale: 1
    });
  });
  */
  d3.select('#plus-info').on('click', function () {
    anime({
      targets: '#plus-info',
      scale: 0
    });
    mySlidr.slide('page-2');
    initSlide2();
  });
  /*
  d3.select('#plus-info').on('mouseover', function () {
    anime({
      targets: '#plus-info',
      scale: 1.2
    });

  });

  d3.select('#plus-info').on('mouseout', function () {
    anime({
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

function changeImage(element){
  var attr = element.getAttribute("src");

  if(attr == "assets/choix/transportCommun1.svg")
    element.setAttribute("src","assets/choix/transportCommun2.svg");
  else if(attr == "assets/choix/transportCommun2.svg")
    element.setAttribute("src", "assets/choix/transportCommun3.svg");
  else if(attr == "assets/choix/transportCommun3.svg")
    element.setAttribute("src", "assets/choix/transportCommun1.svg");
  else
    element.setAttribute("src","assets/choix/transportCommun2.svg");
}