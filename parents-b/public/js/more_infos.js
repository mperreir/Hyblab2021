let initMoreInfo = function() {

    muteAll();

    d3.select('.go-back-more-infos').on('click', function() {
        mySlidr.slide('down');
        resetHome();
        setTimeout(function() {
            initHome();
        }, 1200);
    });
};
