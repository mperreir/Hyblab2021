let initHistoire = function(){

    d3.select('.accueil').on('click', function (){
        mySlidr.slide('home-page');
        initHome();
    });

    d3.select('.logoAccueil').on('click', function (){
        mySlidr.slide('home-page');
        initHome();
    });

    document.getElementById("dialog2").hidden = true;
    document.getElementById("dialog").hidden = false;

    d3.select('.suivant_histoire').on('click', function (){
        document.getElementById("dialog").hidden = true;
        document.getElementById("dialog2").hidden = false;
        document.getElementById("suivant_histoire").hidden = true;
    });

};