registerSlide("page-accueil", function () {

    d3.select('#startButton').on('click', function () {
        overrideAnim({
            targets: '#startButton',
            scale: 0
        });
        goToSlide('page-carte');
    });

    d3.select('#startButton').on('mouseover', function () {
        overrideAnim({
            targets: '#startButton',
            scale: 1.08
        });
    });

    d3.select('#startButton').on('mouseout', function () {
        overrideAnim({
            targets: '#startButton',
            scale: 1
        });
    });
});
