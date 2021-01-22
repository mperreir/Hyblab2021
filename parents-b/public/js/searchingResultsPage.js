let initSearchingResults = function(){
    setTimeout(function(){
        mySlidr.slide("results-page");
        initResults();
    }, 4000);

    anime({
        targets: '#oya-searching-results',
        translateY: '-5%',
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
    });


    anime({
        targets: '#left-gear-eye',
        rotate: 1080,
        duration: 50000,
        loop: true,
    });

    anime({
        targets: '#right-gear-eye',
        rotate: 1080,
        duration: 50000,
        loop: true,
    });
};
