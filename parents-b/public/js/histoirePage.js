let initHistoire = function(){

    //Revenir sur la page d'accueil
    //TODO
    d3.select('.accueil').on('click', function (){
        mySlidr.slide('home-page');
        initHome();
    });

    document.getElementById("dialog2").hidden = true;
    document.getElementById("dialog").hidden = false;

    d3.select('.suivant_histoire').on('click', function (){
        document.getElementById("dialog").hidden = true;
        document.getElementById("dialog2").hidden = false;
    });
};