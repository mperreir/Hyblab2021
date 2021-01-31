let initActivities = function(){

    //--------------AUDIO-----------
    document.getElementById('fauna_audio').pause();

     let buttonVol = document.getElementById("volumeActivite");
     buttonVol.setAttribute("src", "./img/common/volume_on.svg");
 
     if(isSonOn){
         document.getElementById('activite_audio').play();
         document.getElementById('activite_audio').loop = false;
     }
     else{
         buttonVol.setAttribute("src", "./img/common/volume_off.svg");
     }
     d3.selectAll('.volume').on('click', function (){
         if(isSonOn){
             this.setAttribute("src", "./img/common/volume_off.svg");
             isSonOn = Boolean(false);
             document.getElementById('activite_audio').pause(); 
         }
         else{
             this.setAttribute("src", "./img/common/volume_on.svg");
             isSonOn = Boolean(true);
             document.getElementById('activite_audio').play(); 
         }
     }); 

    //--------------HEADER-------------
    d3.select('.logoAccueil6').on('click', function (){
        mySlidr.slide('home-page');
        initHome();
        resetHome();
    });

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
                scale: 0.9,
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

    d3.select(".arianne-1-activities").on('click', function (){
        mySlidr.slide('left');
        setTimeout(function(){
            mySlidr.slide('down');
        }, 1500);
        setTimeout(function(){
            mySlidr.slide('left');
        }, 3000);
        setTimeout(function(){
            mySlidr.slide('left');
        }, 4500);
        setTimeout(function(){
            mySlidr.slide('left');
        }, 6000);
        initAddress();
    });

    d3.select(".arianne-2-activities").on('click', function (){
        mySlidr.slide('left');
        setTimeout(function(){
            mySlidr.slide('down');
        }, 1500);
        setTimeout(function(){
            mySlidr.slide('left');
        }, 3000);
        setTimeout(function(){
            mySlidr.slide('left');
        }, 4500);
        initHour();
    });

    d3.select(".arianne-3-activities").on('click', function (){
        mySlidr.slide('left');
        setTimeout(function(){
            mySlidr.slide('down');
        }, 1500);
        setTimeout(function(){
            mySlidr.slide('left');
        }, 3000);
        initAge();
    });

    d3.select(".arianne-4-activities").on('click', function (){
        mySlidr.slide('left');
        setTimeout(function(){
            mySlidr.slide('down');
        }, 1500);
        initAccess();
    });

    d3.select(".arianne-5-activities").on('click', function (){
        mySlidr.slide('left');
        initActivities();
    });
};

