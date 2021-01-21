let sketchCiel = function(p) {
    let imgCielJour;
    let imgCielNuit;
    let imgCielSoleil;
    let imgMerAgiteeJour;
    let imgMerAgiteeNuit;
    let imgMerAgiteeSoleil;
    let imgMerCalmeJour;
    let imgMerCalmeNuit;
    let imgMerCalmeSoleil;
    let imgSolGaletJour;
    let imgSolGaletNuit;
    let imgSolGaletSoleil;
    let imgSolSableJour;
    let imgSolSableNuit;
    let imgSolSableSoleil;


    /**affichee**/
    let imgdisplayCiel;
    let imgdisplayMer;
    let imgdisplaySol;

    p.setup = function(){
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(250);
      img = p.loadImage('img/plage.jpg');
      imgCielJour = p.loadImage('img/Ciel/cieljour.png');
      imgCielNuit = p.loadImage('img/Ciel/cielnuit.png');
      imgCielSoleil = p.loadImage('img/Ciel/cielsoleil.png');

      imgMerAgiteeJour = p.loadImage('img/Mer/MerAgitee/meragiteejour.png');
      imgMerAgiteeNuit = p.loadImage('img/Mer/MerAgitee/meragiteenuit.png');
      imgMerAgiteeSoleil = p.loadImage('img/Mer/MerAgitee/meragiteesoleil.png');
      imgMerCalmeJour = p.loadImage('img/Mer/MerCalme/mercalmejour.png');
      imgMerCalmeNuit = p.loadImage('img/Mer/MerCalme/mercalmenuit.png');
      imgMerCalmeSoleil = p.loadImage('img/Mer/MerCalme/mercalmesoleil.png');

      imgSolGaletJour = p.loadImage('img/Sol/Galet/galetjour.png');
      imgSolGaletNuit = p.loadImage('img/Sol/Galet/galetnuit.png');
      imgSolGaletSoleil = p.loadImage('img/Sol/Galet/galetsoleil.png');
      imgSolSableJour = p.loadImage('img/Sol/Sable/sablejour.png');
      imgSolSableNuit = p.loadImage('img/Sol/Sable/sablenuit.png');
      imgSolSableSoleil = p.loadImage('img/Sol/Sable/sablesoleil.png');

      imgdisplayCiel = imgCielJour;
      imgdisplayMer = imgMerCalmeJour;
      imgdisplaySol = imgSolSableJour;
    }

    p.draw = function() {
      affichage = getAffichage();
      //p.image(img, 0, 0, p.windowWidth, p.windowHeight);
      p.background("#87CEEB");
      animationCiel();
        // Displays the image at point (0, 0) at canvas size
    }
      
    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    animationCiel = function(){

      p.text('activite : ' + affichage.activite, 80, 80);
      p.text('type : ' + affichage.type, 80, 100);
      p.text('moment : ' + affichage.moment, 80, 120);
      p.text('ciel : ' + affichage.ciel, 80, 140);
      p.text('maree : ' + affichage.maree, 80, 160);
      p.text('mer : ' + affichage.mer, 80, 180);
      p.text('amenagement : ' + affichage.amenagement, 80, 200);

      p.image(imgdisplayCiel, 0, 0, p.windowWidth, p.windowHeight);
      p.image(imgdisplayMer, 0, 0, p.windowWidth, p.windowHeight);
      p.image(imgdisplaySol, 0, 0, p.windowWidth, p.windowHeight);

    }

    sketchCiel.updateSketchCiel = function(){
      if(affichage.moment == "journee"){
        imgdisplayCiel = imgCielJour;
        if(affichage.mer == "calme"){
          imgdisplayMer = imgMerCalmeJour;
        }
        else if(affichage.mer == "agitee"){
          imgdisplayMer = imgMerAgiteeJour;
        }

        if(affichage.type == "galets"){
          imgdisplaySol = imgSolGaletJour;
        }
        else if(affichage.type == "sable"){
          imgdisplaySol = imgSolSableJour;
        }
      }
      else if(affichage.moment == "nuit"){
        imgdisplayCiel = imgCielNuit;
        if(affichage.mer == "calme"){
          imgdisplayMer = imgMerCalmeNuit;
        }
        else if(affichage.mer == "agitee"){
          imgdisplayMer = imgMerAgiteeNuit;
        }

        if(affichage.type == "galets"){
          imgdisplaySol = imgSolGaletNuit;
        }
        else if(affichage.type == "sable"){
          imgdisplaySol = imgSolSableNuit;
        }
      }
      else{
        imgdisplayCiel = imgCielSoleil;
        if(affichage.mer == "calme"){
          imgdisplayMer = imgMerCalmeSoleil;
        }
        else if(affichage.mer == "agitee"){
          imgdisplayMer = imgMerAgiteeSoleil;
        }

        if(affichage.type == "galets"){
          imgdisplaySol = imgSolGaletSoleil;
        }
        else if(affichage.type == "sable"){
          imgdisplaySol = imgSolSableSoleil;
        }
      }
    }

    
  };
  new p5(sketchCiel, 'displayCanvas');