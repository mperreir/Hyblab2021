// SLIDE CHOIX BICLOO


let initSlideChoixBicloo = function(){

  d3.select('#ok-button').on('click', function(){
    anime({
        targets: 'ok-button',
        scale: 0
      });
    mySlidr.slide('page-2');
    initSlide2();
  });

  d3.select('#fleche-droite-bycl').on('click', function(){
    anime({
        targets: '#fleche-droite-bycl',
        scale: 0
      });
      mySlidr.slide('choix-transport-4');
      initSlideChoixTransport();
  });

  d3.select('#fleche-droite-bycl').on('mouseover', function(){
    anime({
        targets: '#fleche-droite-bycl',
        scale: 1.2
      });
      
  });

  d3.select('#fleche-droite-bycl').on('mouseout', function(){
    anime({
        targets: '#fleche-droite-bycl',
        scale: 1
      }); 
  });


  d3.select('#fleche-gauche-bycl').on('click', function(){
    anime({
        targets: '#fleche-gauche-bycl',
        scale: 0
      });
      mySlidr.slide('choix-transport-2');
      initSlideChoixVelo();
  });

  d3.select('#fleche-gauche-bycl').on('mouseover', function(){
    anime({
        targets: '#fleche-gauche-bycl',
        scale: 1.2
      });
      
  });

  d3.select('#fleche-gauche-bycl').on('mouseout', function(){
    anime({
        targets: '#fleche-gauche-bycl',
        scale: 1
      });
  });

  anime({
    targets: '.transport-4',
    translateX: '100%',
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });

  
};