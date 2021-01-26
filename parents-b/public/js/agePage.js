let initAge = function(){

  //---------------FONCTIONS-----------------
  //Pour avoir l'image du jeu adéquat avec fleche
  function setImage(cpt){
    valeurImage= cpt%4;
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
    valeurImage= cpt%4;
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
    var x = document.getElementById("image_age");
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
    d3.select(".button-next-age").on("click", function (){
        mySlidr.slide("access-page");
        initAccess();
    });

    //Gestion des fleches pour changement image
    //Recupere l'image et modifie la source en fonction du resultat de la division euclidienne
    d3.select(".fleche_gauche").on("click",  function (){
      cpt =cpt-1;
      setImage(cpt);
    });
    //Mouse over de fleche gauche
    d3.select(".fleche_gauche").on("mouseover",  function (){
        var x = document.getElementById("fleche_gauche");
        x.setAttribute("src", "././img/age/fleche_gauche.svg");
    });
    d3.select(".fleche_gauche").on("mouseleave",  function (){
        var x = document.getElementById("fleche_gauche");
        x.setAttribute("src", "././img/age/flecheG.svg");
    });
      

    d3.select(".fleche_droite").on("click",  function (){
      cpt =cpt+1;
      setImage(cpt);
    });
    //Mouse over de fleche droite
    d3.select(".fleche_droite").on("mouseover",  function (){
        var x = document.getElementById("fleche_droite");
        x.setAttribute("src", "././img/age/fleche_droite.svg");
    });
    d3.select(".fleche_droite").on("mouseleave",  function (){
        var x = document.getElementById("fleche_droite");
        x.setAttribute("src", "././img/age/flecheD.svg");
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
        targets: '.age_yeux_cache',
        translateY: '3000%',
        delay : 4300,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: false
      });
    
    anime({
        targets: '.age_yeux_cache2',
        translateY: '3000%',
        delay : 4280,
        opacity: 0,
    });
    
    //Deuxieme robot
    anime({
      targets: '#age_arrive',
      translateY: '-500%',
      delay : 4350,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: false
    });

    let txt2 = anime.timeline({
        targets: '.txt2'
    });
        txt2
            .add({
                opacity: 0,
            })
            .add({
                delay : 4450,
                opacity: 1,
            })
};

