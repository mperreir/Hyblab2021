let initHome = function(){
    let tl_shooting_stars = anime.timeline({
        easing: 'linear',
        loop: true,
    });
    tl_shooting_stars
        .add({
            targets: ".shooting-stars",
            translateX: "-=850%",
            translateY: "+=550%",
            duration: 3000,
        })
        .add({
            targets: ".shooting-stars",
            opacity: 0,
            duration: 10
        })
        .add({
            delay: 4000,
        })

    let tl_begin_over = anime.timeline({
        easing: 'linear',
        loop:true
    });

    d3.select('.button-begin').on('mouseover', function (){

        tl_begin_over
            .add({
                targets: ".button-begin",
                scale: 1.3,
                duration: 500
            })
            .add({
                targets: ".button-begin",
                scale: 0.8,
                duration: 500
            })
            .add({
                targets: ".button-begin",
                scale: 1,
                duration: 500
            })
    });

    d3.select('.button-begin').on('mouseleave' ,function (){
        anime({
            targets: ".button-begin",
            scale: 1,
            duration: 200,
            ease: 'linear'
        });
        tl_begin_over.pause();
    });

    d3.select('.button-begin').on('click', function (){
        let tl_begin = anime.timeline({
            easing: 'easeOutCubic'
        });

        tl_begin
            .add({
                targets: ".button-begin",
                opacity: 0,
                duration: 300
            })
            .add({
                targets: ".catch-phrase",
                opacity: 0,
                offset: "-=300",
                duration: 300
            })
            .add({
                targets: ".talking-bubble-home",
                opacity: 1,
                duration: 750,
                easing: "linear"
            })
            .add({
                targets: ".oya-home-go",
                opacity: 1,
                duration: 1000,
                offset: "-=1000",
                easing: "linear"
            })
            .add({
                delay: 1000
            })
            .add({
                targets: ".talking-bubble-home",
                opacity: 0,
                duration: 500,
                easing: "linear"
            })
            .add({
                targets: ".oya-home-go",
                opacity: 0,
                duration: 500,
                offset: "-=500",
                easing: "linear"
            })
            .add({
                targets: ".oya-hello",
                translateX: '80%',
                scale: 0.6,
                duration: 1000,
            })
            .add({
                targets: ".rocket-hello",
                scale: 0.1,
                duration: 50
            })
            .add({
                targets: ".rocket-hello",
                opacity: 1,
                duration: 300,
            })
            .add({
                targets: ".rocket-hello",
                scale: 1,
                duration: 1000,
            })
            .add({
                targets: ".rocket-hello",
                translateY: '40%',
                duration: 500,
                easing:"easeOutCirc"
            })
            .add({
                targets: ".oya-hello",
                translateX: "60%",
                scale: 0.6,
            })
            .add({
                targets: ".oya-hello",
                translateX: "10%",
                scale: 0,
                duration: 1000,
            })
            .add({
                targets: ".rocket-hello",
                translateY: "-150%",
                duration: 1000,
            })
            .finished.then(() => {
            mySlidr.slide('down');
            initAddress();
        });
    });
};