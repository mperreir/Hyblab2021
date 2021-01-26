let initHome = function(){
    /*
    d3.select('#logo-adopte-un-parc').on('click', function (){
        anime({
            targets: '#logo-adopte-un-parc',
            scale: 0
        });
        mySlidr.slide('page-home');
        initHome();
    });

    d3.select('#logo-adopte-un-parc').on('mouseover', function(){
        anime({
            targets: '#logo-adopte-un-parc',
            scale: 1.2
        });
    });

    d3.select('#logo-adopte-un-parc').on('mouseout', function(){
        anime({
            targets: '#logo-adopte-un-parc',
            scale: 1
        });
    });*/

    d3.select('.button-begin').on('click', function (){
        mySlidr.slide('down');
        initAddress();
    });
};