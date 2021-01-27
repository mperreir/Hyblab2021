// init du slider (qui peut aussi faire des fondus enchainé)
let mySlidr = slidr.create('slidr',{
    breadcrumbs: true,
    controls: 'none',
    direction: 'horizontal',
    fade: true,
    keyboard: true,
    overflow: true,
    pause: false,
    theme: '#222',
    timing: { 'fade': '0.5s ease-in' },
    touch: true,
    transition: 'fade'
  }).start();

// on s'occupe de la 1ère slide
let initSlide1 = function() {
  d3.select('#logo').on('click', function(){
      mySlidr.slide('page-1_1');
      initSlide1_1();
    });
}

let initSlide1_1= function() {
    d3.select('#t').on('click', function(){
        mySlidr.slide('page-2');
        initSlide2_1();
    });
}
/*
let initSlide2 = function() {
    setTimeout(suiteTraitement, 1000)
    function suiteTraitement()
    {
        mySlidr.slide('page-2.1');
        initSlide2_1();
    }
}*/

let initSlide2_1 = function() {
    d3.select('#button-p2-1').on('click', function(){
        mySlidr.slide('page-3');
        initSlide3();
    });

}


let initSlide3= function() {
    d3.select('#button-p2-1').on('click', function(){
        mySlidr.slide('page-4');
        initSlide4();
    });

}


//Initialisation du diaporama 
initSlide1();