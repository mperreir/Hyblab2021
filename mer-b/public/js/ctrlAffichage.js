function updateElement(element, reponse){
    let valeur = reponse.json;
    let affichage = getAffichage();
    if(element == "amenagement"){
      if(affichage[element].includes(valeur)){
        affichage[element] = affichage[element].replace(valeur + ',','');
      }
      else {
        affichage[element] += valeur + ',';
      }
    }
    else {
      affichage[element] = valeur;
    }

    sketchCiel.updateSketchCiel(element, reponse);
    console.log(getAffichage());
    if(element == "moment" && reponse.json == "nuit"){
      let root = document.documentElement;
      root.style.setProperty('--citation-color', "white");
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }