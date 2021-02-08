let initActivities = function() {

    // -------------- AUDIO -----------
    muteAll();

    let buttonVol = document.getElementById("volumeActivities");
    buttonVol.setAttribute("src", "./img/common/volume_on.svg");

    if (isSonOn) {
        document.getElementById('activities_audio').play();
        document.getElementById('activities_audio').loop = false;
        document.getElementById('activities_audio').volume = 0.15;
    }
    else buttonVol.setAttribute("src", "./img/common/volume_off.svg");


    d3.selectAll('#volumeActivities').on('click', function() {
        if (isSonOn) {
            this.setAttribute("src", "./img/common/volume_off.svg");
            isSonOn = Boolean(false);
            document.getElementById('activities_audio').pause();
        } else {
            this.setAttribute("src", "./img/common/volume_on.svg");
            isSonOn = Boolean(true);
            document.getElementById('activities_audio').play();
        }
    });


    // -------------- HEADER -------------
    // Retour à l'accueil
    d3.select('.logoAccueil6').on('click', function() {
        muteAll();
        mySlidr.slide('home-page');
        resetHome();
        setTimeout(function() {
            initHome();
        }, 1200);
    });

    // Sliding du bouton "Suivant"
    d3.select('.button-suivant-activities').on('click', function() {
        muteAll();
        mySlidr.slide('right');
        setTimeout(function() {
            initSearchingResults();
        }, 1200);
    });


    // Animation du bouton "Suivant"
    let tl_suivant_activities_over = anime.timeline({
        easing: 'linear',
        loop:true
    });

    d3.select('.button-suivant-activities').on('mouseover', function() {
        tl_suivant_activities_over
            .add({
                targets: ".button-suivant-activities",
                scale: 1.1,
                duration: 500
            })
            .add({
                targets: ".button-suivant-activities",
                scale: 0.9,
                duration: 500
            })
            .add({
                targets: ".button-suivant-activities",
                scale: 1,
                duration: 500
            })
    });


    d3.select('.button-suivant-activities').on('mouseleave', function() {
        anime({
            targets: ".button-suivant-activities",
            scale: 1,
            duration: 200,
            ease: 'linear'
        });
        tl_suivant_activities_over.pause();
    });


    // Fil d'Ariane
    d3.select(".ariane-1-activities").on('click', function() {
        muteAll();
        mySlidr.slide('left');
        setTimeout(function() {
            mySlidr.slide('down');
        }, 1500);
        setTimeout(function() {
            mySlidr.slide('left');
        }, 3000);
        setTimeout(function() {
            mySlidr.slide('left');
        }, 4500);
        setTimeout(function() {
            mySlidr.slide('left');
        }, 6000);
        setTimeout(function() {
            initAddress();
        }, 7200);
    });


    d3.select(".ariane-2-activities").on('click', function() {
        muteAll();
        mySlidr.slide('left');
        setTimeout(function() {
            mySlidr.slide('down');
        }, 1500);
        setTimeout(function() {
            mySlidr.slide('left');
        }, 3000);
        setTimeout(function() {
            mySlidr.slide('left');
        }, 4500);
        setTimeout(function() {
            initHour();
        }, 5700);
    });


    d3.select(".ariane-3-activities").on('click', function() {
        muteAll();
        mySlidr.slide('left');
        setTimeout(function() {
            mySlidr.slide('down');
        }, 1500);
        setTimeout(function() {
            mySlidr.slide('left');
        }, 3000);
        setTimeout(function() {
            initAge();
        }, 4200);
    });


    d3.select(".ariane-4-activities").on('click', function() {
        muteAll();
        mySlidr.slide('left');
        setTimeout(function() {
            mySlidr.slide('down');
        }, 1500);
        setTimeout(function() {
            initAccess();
        }, 2700);
    });


    d3.select(".ariane-5-activities").on('click', function() {
        muteAll();
        mySlidr.slide('left');
        setTimeout(function() {
            initFaunaFlora();
        }, 1200);
    });
};

