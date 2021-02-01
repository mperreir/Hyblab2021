let initResults = function() {

    // ------------------ AUDIO --------------------
    muteAll();

    let buttonVol = document.getElementById("volumeResult2");
    buttonVol.setAttribute("src", "./img/common/volume_on.svg");

    if (isSonOn) {
        document.getElementById('result2_audio').play();
        document.getElementById('result2_audio').loop = false;
        document.getElementById('result2_audio').volume = 0.15;
    }
    else buttonVol.setAttribute("src", "./img/common/volume_off.svg");


    d3.selectAll('#volumeResult2').on('click', function() {
        if (isSonOn) {
            this.setAttribute("src", "./img/common/volume_off.svg");
            isSonOn = Boolean(false);
            document.getElementById('result2_audio').pause();
        } else {
            this.setAttribute("src", "./img/common/volume_on.svg");
            isSonOn = Boolean(true);
            document.getElementById('result2_audio').play();
        }
    });

    // --------------------- SLIDE --------------------
    // Retour à l'accueil
    d3.select('.logoAccueil7').on('click', function() {
        muteAll();
        mySlidr.slide('home-page');
        resetHome();
        setTimeout(function() {
            initHome();
        }, 1200);
    });


    // Sliding du bouton "Suivant"
    d3.select('.button-suivant-results').on('click', function() {
        muteAll();
        mySlidr.slide('right');
        setTimeout(function() {
            initCredits();
        }, 1200);
    });
};
