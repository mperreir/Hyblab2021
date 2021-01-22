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

    /*pluie*/
    var rain = [];
    var rainingNow = false;

    /**orage**/
    var xCoord1 = 0;
    var yCoord1 = 0;
    var xCoord2 = 0;
    var yCoord2 = 0;
    var step = 0;
    var orage = false;

    p.setup = function(){
      fade = 0

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

      //imgdisplayCiel = imgCielJour;
      //imgdisplayMer = imgMerCalmeJour;
      //imgdisplaySol = imgSolSableJour;

      for (i = 0; i < 100; i++) {
        rain[i] = new Rain(p.random(50, p.windowWidth), p.random(0, -3000));
      }

      xCoord2 = 0;
      yCoord2 = p.windowHeight;
    }

    p.draw = function() {
      affichage = getAffichage();
      //p.image(img, 0, 0, p.windowWidth, p.windowHeight);
      p.background("#62F2FF");
      animationCiel();

      if (rainingNow == true) {
        //background(100);
        for (i = 0; i < rain.length; i++) {
          rain[i].dropRain();
          rain[i].splash();
        }
      }
    }
      
    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    animationCiel = function(){
      step += 1;
      
      if(imgdisplayCiel){
        p.image(imgdisplayCiel, 0, 0, p.windowWidth, p.windowHeight);
      }
      if(orage){
        for (var i = 0; i < 20; i++) {
          xCoord1 = xCoord2;
          yCoord1 = yCoord2;
          xCoord2 = xCoord1 + p.int(p.random(-20, 20));
          yCoord2 = yCoord1 + p.int(p.random(0, 20));
          p.strokeWeight(p.random(1, 6));
          p.strokeJoin(p.MITER);
          p.line(xCoord1, yCoord1, xCoord2, yCoord2);
  
          if (((xCoord2 > p.width) | (xCoord2 < 0) | (yCoord2 > p.height) | (yCoord2 < 0)) && step > 30){
            step = 0;
            //p.clear();
            //animationCiel();
            xCoord2 = p.int(p.random(p.width/2 + 200, p.width));
            yCoord2 = 0;
            p.stroke(255, 255, p.random(0, 255));
          }
        }
      }
      
      if(imgdisplayMer){
        p.image(imgdisplayMer, 0, 0, p.windowWidth, p.windowHeight);
      }
      if(imgdisplaySol){
        p.image(imgdisplaySol, 0, 0, p.windowWidth, p.windowHeight);
      }
    }

    sketchCiel.resetSketchCiel = function(){
      imgdisplayCiel = undefined;
      imgdisplayMer = undefined;
      imgdisplaySol = undefined;
    }

    sketchCiel.updateSketchCiel = function(){
      if(affichage.ciel == 'pluie'){
        rainingNow = true;
      }
      else if(affichage.ciel == 'orageux'){
        rainingNow = true;
        orage = true;
      }
      else {
        for (i = 0; i < 100; i++) {
          rain[i] = new Rain(p.random(50, p.windowWidth), p.random(0, -3000));
        }
        rainingNow = false;
        orage = false;
      }


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
      else if(affichage.moment){
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

    function Rain(x, y) {
      this.x = x;
      this.y = y;
      //this.gravity = 9.8;
      this.length = 15;
      this.r = 0;
      this.opacity = 200;
    
    
      this.dropRain = function() {
        p.noStroke();
        p.fill(255);
        //rect(this.x, this.y,3,15);
        p.ellipse(this.x, this.y, 3, this.length);
        this.y = this.y + 6 //+ frameCount/60;
        if (this.y > 540) {
          this.length = this.length - 5;
          //this.y= random(0,-100);
        }
        if (this.length < 0) {
          this.length = 0;
        }
      }
    
      this.splash = function() {
        p.strokeWeight(2);
        //stroke(245, 200/frameCount);
        p.stroke(245, this.opacity);
        p.noFill();
        if (this.y > 500) {
          p.ellipse(this.x, 550, this.r * 2, this.r / 2);
          this.r++;
          this.opacity = this.opacity - 10;
    
          //keep the rain dropping
          if (this.opacity < 0) {
            this.y = p.random(0, -100);
            this.length = 15;
            this.r = 0;
            this.opacity = 200;
          }
        }
      }
    }
    
    
  };
  new p5(sketchCiel, 'displayCanvas');