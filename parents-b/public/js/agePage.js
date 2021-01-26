let initAge = function(){

    //---------------FONCTIONS-----------------
    //Pour avoir l'image du jeu adéquat avec fleche
    function setImage(cpt){
        let valeurImage= cpt%4;
        console.log(valeurImage)
        if(valeurImage==0 ){
            x.setAttribute("src", "././img/age/agebb.svg");
        }
        if(valeurImage==1 || valeurImage==-1 ){
            x.setAttribute("src", "././img/age/agenounours.svg");
        }
        if(valeurImage==2 || valeurImage==-2 ){
            x.setAttribute("src", "././img/age/agelego.svg");
        }
        if(valeurImage==3 || valeurImage==-3 ){
            x.setAttribute("src", "././img/age/ageballon.svg");
        }
    }

    //Pour afficher le logo et les croix de suppression lors d'un choix avec le boutton plus
    function activeLogoChoix(cpt){
        let valeurImage= cpt%4;
        console.log(valeurImage)
        if(valeurImage==0 ){
            document.getElementById("bb").hidden = false;
            document.getElementById("supp_bb").hidden = false;
        }
        if(valeurImage==1 || valeurImage==-1 ){
            document.getElementById("nounours").hidden = false;
            document.getElementById("supp_nounours").hidden = false;
        }
        if(valeurImage==2 || valeurImage==-2 ){
            document.getElementById("lego").hidden = false;
            document.getElementById("supp_lego").hidden = false;
        }
        if(valeurImage==3 || valeurImage==-3 ){
            document.getElementById("ballon").hidden = false;
            document.getElementById("supp_ballon").hidden = false;
        }
    }

    let cpt = 0;


    //---------------DES L'OUVERTURE-----------------
    let x = document.getElementById("image_age");
    x.setAttribute("src", "././img/age/agebb.svg");

    //Cache tous les elements de choix d'age au début
    document.getElementById("bb").hidden = true;
    document.getElementById("supp_bb").hidden = true;
    document.getElementById("nounours").hidden = true;
    document.getElementById("supp_nounours").hidden = true;
    document.getElementById("lego").hidden = true;
    document.getElementById("supp_lego").hidden = true;
    document.getElementById("ballon").hidden = true;
    document.getElementById("supp_ballon").hidden = true;


    //---------------BOUTTONS-----------------
    //Bouton suivant
    d3.select('.button-suivant-age').on('click', function (){
        tl_suivant_age_over.pause();
        mySlidr.slide('right');
        initAccess();
    });

    //Gestion des fleches pour changement image
    //Recupere l'image et modifie la source en fonction du resultat de la division euclidienne
    d3.select(".fleche_gauche").on("click",  function (){
        cpt =cpt-1;
        setImage(cpt);
    });

    d3.select(".fleche_droite").on("click",  function (){
        cpt =cpt+1;
        setImage(cpt);
    });

    //Bouton plus
    d3.select(".boutton_add").on("click",  function (){
        activeLogoChoix(cpt);
    });

    //Cache les logo si le bouton plus est activé
    d3.select(".supp_bb").on("click",  function (){
        document.getElementById("bb").hidden = true;
        document.getElementById("supp_bb").hidden = true;
    });

    d3.select(".supp_nounours").on("click",  function (){
        document.getElementById("nounours").hidden = true;
        document.getElementById("supp_nounours").hidden = true;
    });

    d3.select(".supp_lego").on("click",  function (){
        document.getElementById("lego").hidden = true;
        document.getElementById("supp_lego").hidden = true;
    });

    d3.select(".supp_ballon").on("click",  function (){
        document.getElementById("ballon").hidden = true;
        document.getElementById("supp_ballon").hidden = true;
    });




    //----------ANIMATIONS---------------
    //Premier robot
    anime({
        targets: '#age_yeux_cache',
        translateY: '3000%',
        delay : 2800,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: false
    });

    //Devrait avoir lieu à un onclic sur les fleche/plus
    //Deuxieme robot
    anime({
        targets: '#age_arrive',
        translateY: '-500%',
        delay : 2750,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: false
    });

    anime({
        targets: '#vague_chut',
        translateY: '-700%',
        delay : 3150,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: false
    });

    anime({
        targets: '#txt_chut',
        translateY: '-1300%',
        delay : 3150,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: false
    });

    //Bouton Suivant
    let tl_suivant_age_over = anime.timeline({
        easing: 'linear',
        loop:true
    });

    d3.select('.button-suivant-age').on('mouseover', function (){
        tl_suivant_age_over
            .add({
                targets: ".button-suivant-age",
                scale: 1.1,
                duration: 500
            })
            .add({
                targets: ".button-suivant-age",
                scale: 0.8,
                duration: 500
            })
            .add({
                targets: ".button-suivant-age",
                scale: 1,
                duration: 500
            })
    });

    d3.select('.button-suivant-age').on('mouseleave' ,function (){
        anime({
            targets: ".button-suivant-age",
            scale: 1,
            duration: 200,
            ease: 'linear'
        });
        tl_suivant_age_over.pause();
    });
};