let initResults = function(){
    d3.select('.button-next-results').on('click', function (){
        mySlidr.slide('home-page');
        initHome();
    });

    new Splide( '.result-icon-slider', {
        type    : 'loop',
        perPage : 3,
        autoplay: true,
    } ).mount();
};
