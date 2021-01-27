// SLIDE CHOIX BICLOO


let initSlideChoixBicloo = function () {
    d3.select('#fleche-droite-bycl').on('click', function () {
      anime({
        targets: '#fleche-droite-bycl',
        scale: 0
      });
      mySlidr.slide('choix-transport-4');
      initSlideChoixTransport();
    });
  
    d3.select('#fleche-droite-bycl').on('mouseover', function () {
      anime({
        targets: '#fleche-droite-bycl',
        scale: 1.2
      });
  
    });
  
    d3.select('#fleche-droite-bycl').on('mouseout', function () {
      anime({
        targets: '#fleche-droite-bycl',
        scale: 1
      });
    });
  
  
    d3.select('#fleche-gauche-bycl').on('click', function () {
      anime({
        targets: '#fleche-gauche-bycl',
        scale: 0
      });
      mySlidr.slide('choix-transport-2');
      initSlideChoixVelo();
    });
  
    d3.select('#fleche-gauche-bycl').on('mouseover', function () {
      anime({
        targets: '#fleche-gauche-bycl',
        scale: 1.2
      });
  
    });
  
    d3.select('#fleche-gauche-bycl').on('mouseout', function () {
      anime({
        targets: '#fleche-gauche-bycl',
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
    d3.select('#plus-info-bicloo').on('click', function () {
      anime({
        targets: '#plus-info-bicloo',
        scale: 0
      });
      mySlidr.slide('info-choix-bicloo');
      initSlideInfosBicloo();
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





  // *******************************
  // SLIDE CHOIX TRANSPORT EN COMMUN
  // *******************************




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
    d3.select('#plus-info-transports').on('click', function () {
      anime({
        targets: '#plus-info-transports',
        scale: 0
      });
      mySlidr.slide('info-choix-transports');
      initSlideInfosTransports();
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




  // *******************************
  // SLIDE CHOIX VELO
  // ******************************* 





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
    d3.select('#plus-info-velo').on('click', function () {
      anime({
        targets: '#plus-info-velo',
        scale: 0
      });
      mySlidr.slide('info-choix-velo');
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
    d3.select('#plus-info-voiture').on('click', function () {
      anime({
        targets: '#plus-info-voiture',
        scale: 0
      });
      mySlidr.slide('info-choix-voiture');
      initSlideInfosVoiture();
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