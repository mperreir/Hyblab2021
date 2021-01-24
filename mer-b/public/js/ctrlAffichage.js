function updateElement(element, reponse){
    let valeur = reponse.json;
    let affichage = getAffichage();
    if(element == "amenagement"){
      if(affichage[element].includes(valeur)){
        affichage[element] = affichage[element].replace(valeur + ',','');
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
    }
    else if(element == "moment" && reponse.json == "day"){
      root.style.setProperty('--breadcrumb-color', "#9DF5FF");
    }
    else if(element == "moment"){
      root.style.setProperty('--breadcrumb-color', "#D07BBC");
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }