let initCredits = function(){

    d3.select('.go-back-end').on('click', function () {
        mySlidr.slide('left');
        initEnd();
    });

    d3.select('.more-info').on('click', function (){
        //Doit ouvrir la page qui sommes nous
    });

    d3.select('.logoAccueil9').on('click', function (){
        mySlidr.slide('home-page');
        resetHome();
        initHome();
    });

};