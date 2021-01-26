let initSlide1 = function () {

    d3.select('#startButton').on('click', function () {
        anime({
            targets: '#startButton',
            scale: 0
        });
        mySlidr.slide('page-carte');
        initCarte();
    });

    d3.select('#startButton').on('mouseover', function () {
        anime({
            targets: '#startButton',
            scale: 1.2
        });
    });

    d3.select('#startButton').on('mouseout', function () {
        anime({
            targets: '#startButton',
            scale: 1
        });
    });

    anime({
        targets: '#titre',
        translateX: '100%',
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
    });

    d3.json('data/dummy.json')
        .then(function (data) {
            d3.select('footer')
                .html('p')
                .text(data.message);
        });
};


