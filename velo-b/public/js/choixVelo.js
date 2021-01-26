// SLIDE CHOIX VELO


let initSlideChoixVelo = function(){

  d3.select('#ok-button').on('click', function(){
    anime({
        targets: 'ok-button',
        scale: 0
      });
    mySlidr.slide('page-2');
    initSlide2();
  });

  d3.select('#fleche-droite-velo').on('click', function(){
    anime({
        targets: '#fleche-droite-velo',
        scale: 0
      });
      mySlidr.slide('choix-transport-3');
      initSlideChoixBicloo();
  });


  d3.select('#fleche-droite-velo').on('mouseover', function(){
    anime({
        targets: '#fleche-droite-velo',
        scale: 1.2
      });
  });   

  d3.select('#fleche-droite-velo').on('mouseout', function(){
    anime({
        targets: '#fleche-droite-velo',
        scale: 1
      });
      
  });


  d3.select('#fleche-gauche-velo').on('click', function(){
    anime({
        targets: '#fleche-gauche-velo',
        scale: 0
      });
      mySlidr.slide('choix-transport-1');
      initSlideChoixVoiture();
  });

  d3.select('#fleche-gauche-velo').on('mouseover', function(){
    anime({
        targets: '#fleche-gauche-velo',
        scale: 1.2
      });
      
  });

  d3.select('#fleche-gauche-velo').on('mouseout', function(){
    anime({
        targets: '#fleche-gauche-velo',
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