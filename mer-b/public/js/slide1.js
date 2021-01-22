let initSlide1 = function(){
  console.log("initi");

  d3.select('#boutonGoSlide2').on('click', function(){
    mySlidr.slide('page-2');
    initSlide2();
  });
};