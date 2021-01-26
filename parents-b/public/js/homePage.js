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
        anime({
            targets: ".oya-hello",
            translateX: '80%',
            scale: 0.6,
            duration: 2000,
            easing: 'easeOutCubic'
        }),
            anime({
                targets: ".rocket-hello",
                scale: 0.1
            }),
                anime({
                    targets: ".rocket-hello",
                    opacity: 1,
                    duration: 2000,
                    delay: 2000,
                })
                .finished.then(() => {
                        mySlidr.slide('down');
                        initAddress();
                });
    });
};