let initResults = function(){
    d3.select('.button-next-results').on('click', function (){
        mySlidr.slide('home-page');
        initHome();
        resetHome();
    });
};