let initMoreInfo = function(){
    d3.select('.go-back-more-infos').on('click', function (){
        mySlidr.slide('down');
        initHome();
    });
}
