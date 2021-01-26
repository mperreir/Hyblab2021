let initButtons = function () {

    d3.selectAll('.fancy-button').on('mouseover', function () {
        anime({
            targets: this,
            scale: 0.95
        });
    });

    d3.selectAll('.fancy-button').on('mouseout', function () {
        anime({
            targets: this,
            scale: 1
        });
    });
};


