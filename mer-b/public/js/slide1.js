let initSlide1 = function(){

  d3.select('#boutonGoSlide2').on('click', function(){
    mySlidr.slide('page-2');
    initSlide2();
  });
};