let initAccess = function(){
    d3.select('.button-suivant-access').on('click', function (){
        tl_suivant_access_over.pause();
        mySlidr.slide('up');
        initFaunaFlora();
    });

    //Bouton Suivant
    let tl_suivant_access_over = anime.timeline({
        easing: 'linear',
        loop:true
    });

    d3.select('.button-suivant-access').on('mouseover', function (){
        tl_suivant_access_over
            .add({
                targets: ".button-suivant-access",
                scale: 1.1,
                duration: 500
            })
            .add({
                targets: ".button-suivant-access",
                scale: 0.9,
                duration: 500
            })
            .add({
                targets: ".button-suivant-access",
                scale: 1,
                duration: 500
            })
    });

    d3.select('.button-suivant-access').on('mouseleave' ,function (){
        anime({
            targets: ".button-suivant-access",
            scale: 1,
            duration: 200,
            ease: 'linear'
        });
        tl_suivant_access_over.pause();
    });
};