let initSlide2 = function() {
    d3.select('#logo').on('click', function(){
        anime({
            targets: '#logo',
            scale: 0
          });
        mySlidr.slide('page-2');
        initSlide1();
      });
}