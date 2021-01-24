function updateElement(element, reponse){
    let valeur = reponse.json;
    let affichage = getAffichage();
    if(element == "amenagement"){
      if(affichage[element].includes(valeur)){
        affichage[element] = affichage[element].replace(valeur + '(10000),','');
        sketchCiel.updateSketchCiel();
      }
      else {
        affichage[element] += valeur + '(10000),';
      }
    }
    else {
      affichage[element] = valeur;
    }

    sketchCiel.updateSketchCiel(element, reponse);
    console.log(getAffichage());

    let root = document.documentElement;

    if(element == "moment" && reponse.json == "night"){
      root.style.setProperty('--citation-color', "white");
      root.style.setProperty('--breadcrumb-color', "#274652");
      root.style.setProperty('--bouton-texte-color', "#203443")

    }
    else if(element == "moment" && (reponse.json == "day" || reponse.json == "indifferent")){
      root.style.setProperty('--breadcrumb-color', "#9DF5FF");
      root.style.setProperty('--bouton-texte-color', "#203443")
    }
    else if(element == "moment"){
      root.style.setProperty('--breadcrumb-color', "#D07BBC");
      root.style.setProperty('--bouton-texte-color', "#71265F")
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }