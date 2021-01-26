// SLIDE CHOIX VOITURE

let initSlideChoixVoiture = function () {


  // bouton de droite
  d3.select('#fleche-droite-voit').on('click', function () {
    anime({
      targets: '#fleche-droite-voit',
      scale: 0
    });
    mySlidr.slide('choix-transport-2');
    initSlideChoixVelo();
  });

  d3.select('#fleche-droite-voit').on('mouseover', function () {
    anime({
      targets: '#fleche-droite-voit',
      scale: 1.2
    });

  });

  d3.select('#fleche-droite-voit').on('mouseout', function () {
    anime({
      targets: '#fleche-droite-voit',
      scale: 1
    });
  });

  // bouton de gauche
  d3.select('#fleche-gauche-voit').on('click', function () {
    anime({
      targets: '#fleche-gauche-voit',
      scale: 0
    });
    mySlidr.slide('choix-transport-4');
    console.log('avant init slide');
    initSlideChoixTransport();
    console.log('après init slide');
  });

  d3.select('#fleche-gauche-voit').on('mouseover', function () {
    anime({
      targets: '#fleche-gauche-voit',
      scale: 1.2
    });

  });

  d3.select('#fleche-gauche-voit').on('mouseout', function () {
    anime({
      targets: '#fleche-gauche-voit',
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