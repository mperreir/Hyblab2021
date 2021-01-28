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

//Slide de transi 
let initSlide1_1= function() {
    //Transi 1.2 vers 2(Camille) 
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

function disappear(id){
    d3.select(id)
    .transition()
    .duration(700)
    .style("opacity", 0)
    .style("cursor","classic")
}

function appear(id){
    d3.select(id)
    .transition()
    .delay(600)
    .duration(700)
    .style("opacity", 1)
}

//Camille se présente
let initSlide2 = function() {
    //Transi Camille to Pret a démarrer 
    d3.select('#button-p2-1').on('click', function(){
        console.log("C'est okay")
        console.log( d3.select('#texte-p2-1'))
        
        //Disparition de la 1 bulle 
        disappear('#texte-p2-1')
        disappear('#vector-p2-1')
        disappear('#button-p2-1')

        appear('#texte2-p2-1')
        appear('#vector-p2-1')
        appear('#button-p2-2')

    });
    d3.select('#button-p2-2').on('click', function(){
        mySlidr.slide('page-3')
        initSlide3()
    });
}


//Premiere question : aventurier ? 
let initSlide3= function() {
    //Aventurier -> Plein la vue
    d3.select('#bouton_non_aventurier-p3').on('click', function(){
        mySlidr.slide('page-4');
        initSlide4();
    });
}

//Plein la vue 
let initSlide4= function() {
    //Plein la vue -> avec quoi 
    d3.select("h1").on('click', function(){
        mySlidr.slide('page-5');
        initSlide5();
    });
}



//Initialisation du diaporama
initSlide1();