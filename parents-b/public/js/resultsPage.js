let initResults = function(){
    d3.select('.button-suivant-results').on('click', function (){
        mySlidr.slide('home-page');
        initHome();
    });
};

new Splide( '#splide-one', {
    type : 'loop',
    perPage: 5,
    perMove: 5,
    focus  : 'center',
    heightRatio: 0.19,
    arrows: false,
    pagination: false,
    autoplay: true,
    speed: 25000,
    rewind: false,
    interval: 0,
    cover: true,
    gap: '0.3vw',
    easing: 'linear',
} ).mount();

new Splide( '#splide-two', {
    type : 'loop',
    perPage: 5,
    perMove: 5,
    focus  : 'center',
    heightRatio: 0.19,
    arrows: false,
    pagination: false,
    autoplay: true,
    speed: 25000,
    rewind: false,
    interval: 0,
    cover: true,
    gap: '0.3vw',
    easing: 'linear',
} ).mount();


new Splide( '#splide-three', {
    type : 'loop',
    perPage: 5,
    perMove: 5,
    focus  : 'center',
    heightRatio: 0.19,
    arrows: false,
    pagination: false,
    autoplay: true,
    speed: 25000,
    rewind: false,
    interval: 0,
    cover: true,
    gap: '0.3vw',
    easing: 'linear',
} ).mount();
