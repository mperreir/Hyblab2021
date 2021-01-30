let initResults = function(){

    d3.select('.logoAccueil7').on('click', function (){
        mySlidr.slide('home-page');
        initHome();
        resetHome();
    });

    d3.select('.button-suivant-results').on('click', function (){
        mySlidr.slide('right');
        initCredits();
    });
};
