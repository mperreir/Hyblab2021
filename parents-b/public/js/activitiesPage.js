let initActivities = function(){
    d3.select('.button-suivant-activities').on('click', function (){
        tl_suivant_activities_over.pause();
        mySlidr.slide('right');
        initSearchingResults();
    });

    //Bouton Suivant
    let tl_suivant_activities_over = anime.timeline({
        easing: 'linear',
        loop:true
    });

    d3.select('.button-suivant-activities').on('mouseover', function (){
        tl_suivant_activities_over
            .add({
                targets: ".button-suivant-activities",
                scale: 1.1,
                duration: 500
            })
            .add({
                targets: ".button-suivant-activities",
                scale: 0.8,
                duration: 500
            })
            .add({
                targets: ".button-suivant-activities",
                scale: 1,
                duration: 500
            })
    });

    d3.select('.button-suivant-activities').on('mouseleave' ,function (){
        anime({
            targets: ".button-suivant-activities",
            scale: 1,
            duration: 200,
            ease: 'linear'
        });
        tl_suivant_activities_over.pause();
    });
};