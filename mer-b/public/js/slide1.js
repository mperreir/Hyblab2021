let initSlide1 = function(){
  console.log("initi");

  d3.select('#boutonGoSlide2').on('click', function(){
    mySlidr.slide('page-2');
    initSlide2();
  });

  d3.select('#boutonBegin').on('mouseover', function(){
    
  });

  d3.select('#boutonBegin').on('mouseout', function(){
    
  });


  d3.json('data/dummy.json')
    .then(function(data) {
        d3.select('footer')
            .html('p')
            .text(data.message);
    });
};