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
                scale: 0.9,
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

$(document).ready(function(){

    // $(".dropableCell-fauna").on('drop',function(event){
    //     //gestion de l'ajout / remove de l'image
    // })

    $( ".image-drop-fauna" ).draggable({
         tolerance: 'fit',
         revert: "invalid"
    });

    $(".dropableCell-fauna").droppable({
        accept: ".image-drop-fauna",
        hoverClass: "ui-state-active",
            drop: function( event, ui ) {
               var droppable = $(this);
               var draggable = ui.draggable;
               // Move draggable into droppable
               draggable.appendTo(droppable);
               draggable.css({top: '0px', left: '0px'});
            }
    })

    $(".images-base-fauna").droppable({
        accept: ".image-drop-fauna",
        drop: function( event, ui ) {
           var droppable = $(this);
           var draggable = ui.draggable;
           // Move draggable into droppable
           draggable.css({top: '0px', left: '0px'});
           draggable.appendTo(droppable);
        }
    })
})

