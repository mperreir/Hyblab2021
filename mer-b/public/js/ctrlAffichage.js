function updateElement(element, reponse){
    let valeur = reponse.json;
    let affichage = getAffichage();
    affichage[element] = valeur;

    sketchCiel.updateSketchCiel(element, reponse);
   

    if(reponse.citations){
      updateCitations(reponse.citations[getRandomInt(reponse.citations.length)]);
    }
    else {
      updateCitations('');
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }