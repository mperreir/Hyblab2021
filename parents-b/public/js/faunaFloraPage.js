let initFaunaFlora = function(){
    d3.select('.button-suivant-fauna-flora').on('click', function (){
        tl_suivant_fauna_flora_over.pause();
        mySlidr.slide('right');
        initActivities();
    });

    //Bouton Suivant
    let tl_suivant_fauna_flora_over = anime.timeline({
        easing: 'linear',
        loop:true
    });

    d3.select('.button-suivant-fauna-flora').on('mouseover', function (){
        tl_suivant_fauna_flora_over
            .add({
                targets: ".button-suivant-fauna-flora",
                scale: 1.1,
                duration: 500
            })
            .add({
                targets: ".button-suivant-fauna-flora",
                scale: 0.8,
                duration: 500
            })
            .add({
                targets: ".button-suivant-fauna-flora",
                scale: 1,
                duration: 500
            })
    });

    d3.select('.button-suivant-fauna-flora').on('mouseleave' ,function (){
        anime({
            targets: ".button-suivant-fauna-flora",
            scale: 1,
            duration: 200,
            ease: 'linear'
        });
        tl_suivant_fauna_flora_over.pause();
    });
};