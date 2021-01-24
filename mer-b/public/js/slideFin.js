let initSlideFin = function(){

    d3.select('#goback').on('click', function(){
      mySlidr.slide('page-1');
      setActif(1);
      initSlide1();
      affichageReset();
      sketchCiel.resetSketchCiel();
      var root = document.documentElement;
      root.style.setProperty('--breadcrumb-color', "#9DF5FF");
      root.style.setProperty('--bouton-texte-color', "#203443");
    });
  
    d3.select('#goback').on('mouseover', function(){
      
    });
  
    d3.select('#goback').on('mouseout', function(){
      
    });
  };

function getPlagesSlideFin(){
  
  let plages = getPlages();
  console.log(plages);
}