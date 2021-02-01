let initHistoire = function() {

    muteAll();

    d3.select('.accueil').on('click', function() {
        mySlidr.slide('home-page');
        mySlidr.slider("value", mySlidr.slider("option", "min"));
        resetHome();
        setTimeout(function() {
            initHome();
        }, 1200);
    });


    d3.select('.logoAccueil').on('click', function() {
        mySlidr.slide('home-page');
        resetHome();
        setTimeout(function() {
            initHome();
        }, 1200);
    });


    document.getElementById("dialog2").hidden = true;
    document.getElementById("dialog").hidden = false;
    document.getElementById("suivant_histoire").hidden = false;


    d3.select('.suivant_histoire').on('click', function() {
        document.getElementById("dialog").hidden = true;
        document.getElementById("dialog2").hidden = false;
        document.getElementById("suivant_histoire").hidden = true;
    });
};
