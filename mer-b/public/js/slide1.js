let initSlide1 = function(){

  d3.select('#boutonGoSlide2').on('click', function(){
    var audio = new Audio('sound/400632__inspectorj__ambience-seaside-waves-close-a.wav');
    audio.play();
    audio.loop = true;
    setActif(2);
    mySlidr.slide('page-2');
  });
};