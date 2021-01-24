let initSlide1 = function(){

  d3.select('#boutonGoSlide2').on('click', function(){
    setActif(2);
    mySlidr.slide('page-2');
  });
};