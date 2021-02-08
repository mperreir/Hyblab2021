const initSlide1 = function () {

    d3.select('#logo-hyblab').on('click', function () {
        anime({
            targets: '#logo-hyblab',
            scale: 0
        });
        mySlidr.slide('page-2');
    });

    d3.select('#logo-hyblab').on('mouseover', function () {
        anime({
            targets: '#logo-hyblab',
            scale: 1.1
        });
    });

    d3.select('#logo-hyblab').on('mouseout', function () {
        anime({
            targets: '#logo-hyblab',
            scale: 1
        });
    });

    anime({
        targets: '#clique-debut',
        scale: 1.2,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
    });

    d3.json('data/dummy.json')
        .then(function (data) {
        });
};
