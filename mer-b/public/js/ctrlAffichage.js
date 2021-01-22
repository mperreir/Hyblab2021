function updateElement(element, reponse){
    let valeur = reponse.json;
    let affichage = getAffichage();
    affichage[element] = valeur;

    sketchCiel.updateSketchCiel(element, reponse);
    console.log(getAffichage());
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }