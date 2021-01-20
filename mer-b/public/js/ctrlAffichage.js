function updateElement(element, reponse){
    let valeur = reponse.json;
    let affichage = getAffichage();
    affichage[element] = valeur;

    if(element == "moment" && valeur == "journee"){
      sketchCiel.startSoleilJournee();
    }
    else if (element == "moment" && valeur == "leverSoleil"){
      sketchCiel.startSoleilLever();
    }
    else if (element == "moment" && valeur == "coucherSoleil"){
      sketchCiel.startSoleilCoucher();
    }

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