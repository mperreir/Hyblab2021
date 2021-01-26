// SLIDE CHOIX VOITURE

let initSlideChoixVoiture = function(){

  d3.select('#ok-button').on('click', function(){
    anime({
        targets: 'ok-button',
        scale: 0
      });
    mySlidr.slide('page-2');
    initSlide2();
  });

  // bouton de droite
  d3.select('#fleche-droite-voit').on('click', function(){
    anime({
        targets: '#fleche-droite-voit',
        scale: 0
      });
      mySlidr.slide('choix-transport-2');
      initSlideChoixVelo();
  });

  d3.select('#fleche-droite-voit').on('mouseover', function(){
    anime({
        targets: '#fleche-droite-voit',
        scale: 1.2
      });
      
  });

  d3.select('#fleche-droite-voit').on('mouseout', function(){
    anime({
        targets: '#fleche-droite-voit',
        scale: 1
      });
  });

  // bouton de gauche
  d3.select('#fleche-gauche-voit').on('click', function(){
    anime({
        targets: '#fleche-gauche-voit',
        scale: 0
      });
      mySlidr.slide('choix-transport-4');
      console.log('avant init slide');
      initSlideChoixTransport();
      console.log('après init slide');
  });

  d3.select('#fleche-gauche-voit').on('mouseover', function(){
    anime({
        targets: '#fleche-gauche-voit',
        scale: 1.2
      });
      
  });

  d3.select('#fleche-gauche-voit').on('mouseout', function(){
    anime({
        targets: '#fleche-gauche-voit',
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