let initMoreInfo = function(){
    muteAll();
    d3.select('.go-back-more-infos').on('click', function (){
        mySlidr.slide('down');
        setTimeout(function (){
            initHome();
        }, 1200);
    });
}
