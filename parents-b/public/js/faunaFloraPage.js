let initFaunaFlora = function() {

     // -------------- AUDIO -----------
     muteAll();


    let buttonVol = document.getElementById("volumeFaune");
    buttonVol.setAttribute("src", "./img/common/volume_on.svg");


    if (isSonOn) {
        document.getElementById('fauna_audio').play();
        document.getElementById('fauna_audio').loop = false;
        document.getElementById('fauna_audio').volume = 0.15;

    }
    else buttonVol.setAttribute("src", "./img/common/volume_off.svg");


    d3.selectAll('#volumeFaune').on('click', function() {
        if (isSonOn) {
            this.setAttribute("src", "./img/common/volume_off.svg");
            isSonOn = Boolean(false);
            document.getElementById('fauna_audio').pause();
        } else {
            this.setAttribute("src", "./img/common/volume_on.svg");
            isSonOn = Boolean(true);
            document.getElementById('fauna_audio').play();
        }
    });


    //--------------HEADER-------------*
    // Retour à l'accueil
    d3.select('.logoAccueil5').on('click', function() {
        muteAll();
        mySlidr.slide('home-page');
        resetHome();
        setTimeout(function() {
            initHome();
        }, 1200);
    });

    // Sliding du bouton "Suivant"
    d3.select('.button-suivant-fauna-flora').on('click', function() {
        muteAll();
        tl_suivant_fauna_flora_over.pause();
        mySlidr.slide('right');
        setTimeout(function() {
            initActivities();
        }, 1200);
    });


    // Animation du bouton "Suivant"
    let tl_suivant_fauna_flora_over = anime.timeline({
        easing: 'linear',
        loop:true
    });


    d3.select('.button-suivant-fauna-flora').on('mouseover', function() {
        tl_suivant_fauna_flora_over
            .add({
                targets: ".button-suivant-fauna-flora",
                scale: 1.1,
                duration: 500
            })
            .add({
                targets: ".button-suivant-fauna-flora",
                scale: 0.9,
                duration: 500
            })
            .add({
                targets: ".button-suivant-fauna-flora",
                scale: 1,
                duration: 500
            })
    });


    d3.select('.button-suivant-fauna-flora').on('mouseleave', function() {
        anime({
            targets: ".button-suivant-fauna-flora",
            scale: 1,
            duration: 200,
            ease: 'linear'
        });
        tl_suivant_fauna_flora_over.pause();
    });


    // Fil d'Ariane
    d3.select(".ariane-1-fauna-flora").on('click', function() {
        muteAll();
        mySlidr.slide('down');
        setTimeout(function() {
            mySlidr.slide('left');
        }, 1500);
        setTimeout(function() {
            mySlidr.slide('left');
        }, 3000);
        setTimeout(function() {
            mySlidr.slide('left');
        }, 4500);
        setTimeout(function() {
            initAddress();
        }, 5700);
    });


    d3.select(".ariane-2-fauna-flora").on('click', function() {
        muteAll();
        mySlidr.slide('down');
        setTimeout(function() {
            mySlidr.slide('left');
        }, 1500);
        setTimeout(function() {
            mySlidr.slide('left');
        }, 3000);
        setTimeout(function() {
            initHour();
        }, 4200);
    });


    d3.select(".ariane-3-fauna-flora").on('click', function() {
        muteAll();
        mySlidr.slide('down');
        setTimeout(function() {
            mySlidr.slide('left');
        }, 1500);
        setTimeout(function() {
            initAge();
        }, 2700);
    });


    d3.select(".ariane-4-fauna-flora").on('click', function() {
        muteAll();
        mySlidr.slide('down');
        setTimeout(function() {
            initAccess();
        }, 1200);
    });


    d3.select(".ariane-6-fauna-flora").on('click', function() {
        muteAll();
        mySlidr.slide('right');
        setTimeout(function() {
            initActivities();
        }, 1200);
    });
};


$(document).ready(function() {

    $(".image-drop-fauna").draggable({
        tolerance: 'fit',
        revert: "invalid"
    });


    $(".droppableCell-fauna").droppable({
        accept: ".image-drop-fauna",
        hoverClass: "ui-state-active",
        drop: function(event, ui) {
            var droppable = $(this);
            var draggable = ui.draggable;
            // Move draggable into droppable
            draggable.appendTo(droppable);
            draggable.css({ top: '0px', left: '0px' });
        }
    });

    $(".images-base-fauna").droppable({
        accept: ".image-drop-fauna",
        drop: function(event, ui) {
            var droppable = $(this);
            var draggable = ui.draggable;
            // Move draggable into droppable
            draggable.css({ top: '0px', left: '0px' });
            draggable.appendTo(droppable);
        }
    })
});
