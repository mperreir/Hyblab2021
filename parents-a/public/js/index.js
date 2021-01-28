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
    timing: { 'fade': '0.7s ease-in' },
    touch: true,
    transition: 'fade'
  }).start();


//Transition quand appuie sur logo page 1
let initSlide1 = function() {
  d3.select('#logo').on('click', function(){
      mySlidr.slide('page-1_1');
      initSlide1_1();
    });
}

//Transi 1.2 vers 2(Camille) 
let initSlide1_1= function() {
    d3.select('#t').on('click', function(){
        mySlidr.slide('page-2');
        initSlide2();
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

function diparaitre(id){
    d3.select(id)
    .transition()
    .delay(20)
    .duration(700)
    .style("opacity", 0)
    .style("cursor","classic")
}

//Transi Camille to Pret a démarrer 
let initSlide2 = function() {
    d3.select('#button-p2-1').on('click', function(){
        console.log("C'est okay")
        console.log( d3.select('#texte-p2-1'))
        
        //Disparition de la 1 bulle 
        diparaitre('#texte-p2-1')
        diparaitre('#vector-p2-1')
        diparaitre('#button-p2-1')
           

        //mySlidr.slide('page-3');
        //initSlide3();
        
    });
}


//Pret -> Aventurier
let initSlide3= function() {
    d3.select('#bouton-non-aventurier').on('click', function(){
        mySlidr.slide('page-4');
        initSlide4();
    });
}

//Aventurier -> Plein la vue
let initSlide4= function() {
    d3.select('h1').on('click', function(){
        mySlidr.slide('page-5');
        initSlide5();
    });
}


//Initialisation du diaporama
initSlide1();