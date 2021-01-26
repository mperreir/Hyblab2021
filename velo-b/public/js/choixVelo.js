// SLIDE CHOIX VELO


let initSlideChoixVelo = function () {

  d3.select('#fleche-droite-velo').on('click', function () {
    anime({
      targets: '#fleche-droite-velo',
      scale: 0
    });
    mySlidr.slide('choix-transport-3');
    initSlideChoixBicloo();
  });


  d3.select('#fleche-droite-velo').on('mouseover', function () {
    anime({
      targets: '#fleche-droite-velo',
      scale: 1.2
    });
  });

  d3.select('#fleche-droite-velo').on('mouseout', function () {
    anime({
      targets: '#fleche-droite-velo',
      scale: 1
    });

  });


  d3.select('#fleche-gauche-velo').on('click', function () {
    anime({
      targets: '#fleche-gauche-velo',
      scale: 0
    });
    mySlidr.slide('choix-transport-1');
    initSlideChoixVoiture();
  });

  d3.select('#fleche-gauche-velo').on('mouseover', function () {
    anime({
      targets: '#fleche-gauche-velo',
      scale: 1.2
    });

  });

  d3.select('#fleche-gauche-velo').on('mouseout', function () {
    anime({
      targets: '#fleche-gauche-velo',
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
 


};