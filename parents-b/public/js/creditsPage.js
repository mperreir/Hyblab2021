let initCredits = function(){

    d3.select('.more-info').on('click', function (){
        //Doit ouvrir la page qui sommes nous
    });
    
    console.log('credits chargés');
    
    d3.select('.logoAccueil9').on('click', function (){
        mySlidr.slide('home-page');
        initHome();
    });

};