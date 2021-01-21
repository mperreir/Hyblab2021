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



    p.setup = function(){
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(250);
      img = p.loadImage('img/plage.jpg');
    }

    p.draw = function() {
      affichage = getAffichage();
      //p.image(img, 0, 0, p.windowWidth, p.windowHeight);
      p.background("#87CEEB");
      animationCiel();
      p.fill(34, 106, 228);
      p.rect(0, p.windowHeight/2, p.windowWidth, p.windowHeight/2);
        // Displays the image at point (0, 0) at canvas size
    }
      
    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    animationCiel = function(){
      if(affichage.moment == "journee"){
        drawJournee();
      }
      else if (affichage.moment == "nuit"){
        console.log("nuit");
      }
      else if(affichage.moment == "coucherSoleil"){
        drawCoucher();
      }
      else if(affichage.moment == "leverSoleil") {
        drawLever();
      }
      p.fill(0);
      p.text('activite : ' + affichage.activite, 80, 80);
      p.text('type : ' + affichage.type, 80, 100);
      p.text('moment : ' + affichage.moment, 80, 120);
      p.text('ciel : ' + affichage.ciel, 80, 140);
      p.text('maree : ' + affichage.maree, 80, 160);
      p.text('mer : ' + affichage.mer, 80, 180);
      p.text('amenagement : ' + affichage.amenagement, 80, 200);
    }

    sketchCiel.startSoleilJournee = function(){
      departXSoleil = p.windowWidth/2;
      departYSoleil = p.windowHeight/2 + 40;
      goalYSoleil = 100;
      couleurSoleil = "yellow";
    }

    drawJournee = function(){
      p.fill(couleurSoleil);
      if(departXSoleil != -1 && departYSoleil > goalYSoleil ){
        p.ellipse(departXSoleil, departYSoleil, 80, 80);
        departYSoleil -= 1;
      }
      else if(departXSoleil != - 1){
        p.ellipse(departXSoleil, departYSoleil, 80, 80);
      }
    }

    sketchCiel.startSoleilLever = function(){
      departXSoleil = p.windowWidth/2;
      departYSoleil = p.windowHeight/2 + 40;
      goalXSoleil = 100;
      goalYSoleil = p.windowHeight/2;
      couleurSoleil = "#a64928";
    }

    drawLever = function(){
      p.fill(couleurSoleil);
      if(departXSoleil != -1 && departYSoleil > goalYSoleil ){
        p.ellipse(departXSoleil, departYSoleil, 80, 80);
        departYSoleil -= 1;
      }
      else if(departXSoleil != - 1){
        p.ellipse(departXSoleil, departYSoleil, 80, 80);
      }
    }

    sketchCiel.startSoleilCoucher = function(){
      departXSoleil = p.windowWidth/2;
      departYSoleil = 0;
      goalXSoleil = 100;
      goalYSoleil = p.windowHeight/2;
      couleurSoleil = "#a64928";
    }

    drawCoucher = function(){
      p.fill(couleurSoleil);
      if(departXSoleil != -1 && departYSoleil < goalYSoleil ){
        p.ellipse(departXSoleil, departYSoleil, 80, 80);
        departYSoleil += 2;
      }
      else if(departXSoleil != - 1){
        p.ellipse(departXSoleil, departYSoleil, 80, 80);
      }
    }    
    
  };
  new p5(sketchCiel, 'displayCanvas');