let initEnd = function(){
  d3.select("#img-fini").on('click', function (){
    anime({
      targets: '#img-fini',
      scale: 0
    });
    mySlidr.slide('home');
    initHome();
  });

  anime({
    targets: '#img-fini',
    scale: 1.2,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });
};