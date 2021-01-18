let sketch = function(p) {
    let img;

    p.setup = function(){
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(250);
      img = p.loadImage('img/plage.jpg');
    }

    p.draw = function() {
      affichage = getAffichage();
        // Displays the image at point (0, 0) at canvas size
      p.image(img, 0, 0, p.windowWidth, p.windowHeight);
      p.fill(0);
      p.text('activite : ' + affichage.activite, 80, 80);
      p.text('type : ' + affichage.type, 80, 100);
      p.text('moment : ' + affichage.moment, 80, 120);
      p.text('ciel : ' + affichage.ciel, 80, 140);
      p.text('maree : ' + affichage.maree, 80, 160);
      p.text('mer : ' + affichage.mer, 80, 180);
      p.text('amenagement : ' + affichage.amenagement, 80, 200);
    }
      
    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
  };
  new p5(sketch, 'displayCanvas');