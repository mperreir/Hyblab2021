let initFaunaFlora = function(){
     //--------------AUDIO-----------
     document.getElementById('access_audio').pause();

     let buttonVol = document.getElementById("volumeFaune");
     buttonVol.setAttribute("src", "./img/common/volume_on.svg");
 
     if(isSonOn){
         document.getElementById('fauna_audio').play();
         document.getElementById('fauna_audio').loop = false;
     }
     else{
         buttonVol.setAttribute("src", "./img/common/volume_off.svg");
     }
     d3.selectAll('.volume').on('click', function (){
         if(isSonOn){
             this.setAttribute("src", "./img/common/volume_off.svg");
             isSonOn = Boolean(false);
             document.getElementById('fauna_audio').pause(); 
         }
         else{
             this.setAttribute("src", "./img/common/volume_on.svg");
             isSonOn = Boolean(true);
             document.getElementById('fauna_audio').play(); 
         }
     }); 
 
     
     
 
     //--------------HEADER-------------
    d3.select('.logoAccueil5').on('click', function (){
        mySlidr.slide('home-page');
        initHome();
        resetHome();
    });

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

    d3.select(".arianne-1-fauna-flora").on('click', function (){
        mySlidr.slide('down');
        setTimeout(function(){
            mySlidr.slide('left');
        }, 1500);
        setTimeout(function(){
            mySlidr.slide('left');
        }, 3000);
        setTimeout(function(){
            mySlidr.slide('left');
        }, 4500);
        initAddress();
    });

    d3.select(".arianne-2-fauna-flora").on('click', function (){
        mySlidr.slide('down');
        setTimeout(function(){
            mySlidr.slide('left');
        }, 1500);
        setTimeout(function(){
            mySlidr.slide('left');
        }, 3000);
        initHour();
    });

    d3.select(".arianne-3-fauna-flora").on('click', function (){
        mySlidr.slide('down');
        setTimeout(function(){
            mySlidr.slide('left');
        }, 1500);
        initAge();
    });

    d3.select(".arianne-4-fauna-flora").on('click', function (){
        mySlidr.slide('down');
        initAccess();
    });

    d3.select(".arianne-6-fauna-flora").on('click', function (){
        mySlidr.slide('right');
        initActivities();
    });
};

$(document).ready(function(){


    // $(".droppableCell-fauna").on('drop',function(event){
    //     //gestion de l'ajout / remove de l'image
    // })

    $( ".image-drop-fauna" ).draggable({
         tolerance: 'fit',
         revert: "invalid"
    });

    $(".droppableCell-fauna").droppable({
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
