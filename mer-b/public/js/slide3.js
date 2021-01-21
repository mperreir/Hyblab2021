let initSlide3 = function(){
    let plages = getPlages();
    console.log(getAffichage());

    d3.select('#goback').on('click', function(){
      mySlidr.slide('page-1');
      initSlide1();
      affichageReset();
    });
  
    d3.select('#goback').on('mouseover', function(){
      
    });
  
    d3.select('#goback').on('mouseout', function(){
      
    });
  };