let initCredits = function(){

    d3.select('.go-back-end').on('click', function () {
        muteAll();
        mySlidr.slide('left');
        setTimeout(function (){
            initResults();
        }, 1200);
    });

    d3.select('.logoAccueil9').on('click', function (){
        muteAll();
        mySlidr.slide('home-page');
        resetHome();
        setTimeout(function (){
            initHour();
        }, 1200);
    });
};