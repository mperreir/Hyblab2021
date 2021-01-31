let initHistoire = function(){

    //Coupe Audio du go ne devrai pas avoir lieu car impossible de cliquer pendant lancement fusée
    document.getElementById('debut_audio').pause();

    d3.select('.accueil').on('click', function (){
        mySlidr.slide('home-page');
        mySlidr.slider("value", mySlidr.slider("option", "min") );
        initHome();
    });

    d3.select('.logoAccueil').on('click', function (){
        mySlidr.slide('home-page');
        initHome();
        resetHome();
    });

    document.getElementById("dialog2").hidden = true;
    document.getElementById("dialog").hidden = false;
    document.getElementById("suivant_histoire").hidden = false;

    d3.select('.suivant_histoire').on('click', function (){
        document.getElementById("dialog").hidden = true;
        document.getElementById("dialog2").hidden = false;
        document.getElementById("suivant_histoire").hidden = true;
    });

};
