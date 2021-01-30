let initAccess = function(){

    d3.select('.logoAccueil4').on('click', function (){
        mySlidr.slide('home-page');
        // mySlidr.slider("value", mySlidr.slider("option", "min") )
        initHome();
        resetHome();
    });

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

    d3.select(".arianne-1-access").on('click', function (){
        mySlidr.slide('left');
        setTimeout(function(){
            mySlidr.slide('left');
        }, 1500);
        setTimeout(function(){
            mySlidr.slide('left');
        }, 3000);
        initAddress();
    });

    d3.select(".arianne-2-access").on('click', function (){
        mySlidr.slide('left');
        setTimeout(function(){
            mySlidr.slide('left');
        }, 1500);
        initHour();
    });

    d3.select(".arianne-3-access").on('click', function (){
        mySlidr.slide('left');
        initAge();
    });

    d3.select(".arianne-5-access").on('click', function (){
        mySlidr.slide('up');
        initFaunaFlora();
    });

    d3.select(".arianne-6-access").on('click', function (){
        mySlidr.slide('up');
        setTimeout(function(){
            mySlidr.slide('right');
        }, 1500);
        initActivities();
    });
};

$(document).ready(function(){

    $(".dropableCell").on('drop',function(event){
        //gestion de l'ajout / remove de l'image
    })

    $( ".image-drop" ).draggable({
         tolerance: 'fit',
         revert: "invalid"
    });

    $(".dropableCell").droppable({
        accept: ".image-drop",
        hoverClass: "ui-state-active",
            drop: function( event, ui ) {
               var droppable = $(this);
               var draggable = ui.draggable;
               // Move draggable into droppable
               draggable.appendTo(droppable);
               draggable.css({top: '0px', left: '0px'});
            }
    })

    $(".images-base").droppable({
        accept: ".image-drop",
        drop: function( event, ui ) {
           var droppable = $(this);
           var draggable = ui.draggable;
           // Move draggable into droppable
           draggable.css({top: '0px', left: '0px'});
           draggable.appendTo(droppable);
        }
    })
})
