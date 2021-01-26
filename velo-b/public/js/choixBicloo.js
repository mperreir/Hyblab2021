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

  d3.select('#fleche-droite').on('click', function(){
    anime({
        targets: '#fleche-droite',
        scale: 0
      });
      mySlidr.slide('choix-transport-4');
      initSlideChoixTransport();
  });

  d3.select('#fleche-droite').on('mouseover', function(){
    anime({
        targets: '#fleche-droite',
        scale: 1.2
      });
      
  });

  d3.select('#fleche-droite').on('mouseout', function(){
    anime({
        targets: '#fleche-droite',
        scale: 1
      }); 
  });


  d3.select('#fleche-gauche').on('click', function(){
    anime({
        targets: '#fleche-gauche',
        scale: 0
      });
      mySlidr.slide('choix-transport-2');
      initSlideChoixVelo();
  });

  d3.select('#fleche-gauche').on('mouseover', function(){
    anime({
        targets: '#fleche-gauche',
        scale: 1.2
      });
      
  });

  d3.select('#fleche-gauche').on('mouseout', function(){
    anime({
        targets: '#fleche-gauche',
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