

function updateElement(element, reponse){
    let valeur = reponse.json;
    let affichage = getAffichage();

    if(element == "moment" ){
      let planteJour = document.getElementById("planteJour");
      let planteNuit = document.getElementById("planteNuit");
      let planteSoleil = document.getElementById("planteSoleil");
      if(reponse.json == "day" || reponse.json == "indifferent"){
        planteJour.style.display = 'block';
        planteNuit.style.display = "none";
        planteSoleil.style.display = "none";
      }
      else if(reponse.json == "night"){
        planteJour.style.display = 'none';
        planteNuit.style.display = "block";
        planteSoleil.style.display = "none";
      }
      else {
        planteJour.style.display = 'none';
        planteNuit.style.display = "none";
        planteSoleil.style.display = "block";
      }
    }
    if(element == "amenagement"){
      if(affichage[element].includes(valeur)){
        affichage[element] = affichage[element].replace(valeur + ',','');
        sketchCiel.updateSketchCiel();
      }
      else {
        if(valeur == "harbor"){
          var audio = new Audio('sound/sonSirene.wav');
		  audio.volume = volumeGeneral;
          audio.play();
        }
        affichage[element] += valeur + ',';
      }
    }
    else {
      affichage[element] = valeur;
    }

    /*if(element == "distance"){
      affichage["distancePort"] = affichage[]
      affichage["amenagement"] = affichage["amenagement"].replaceAll(/\((.+?)\)/g, "(" + reponse.json + ")");
    }*/

    sketchCiel.updateSketchCiel(element, reponse);
    console.log(getAffichage());

    let root = document.documentElement;


    if(element == "moment" && reponse.json == "night"){
      root.style.setProperty('--citation-color', "white");
      root.style.setProperty('--breadcrumb-color', "#274652");
      root.style.setProperty('--bouton-texte-color', "#203443");
      root.style.setProperty('--bouton-bg-color', '#000D12');
      document.body.style.backgroundImage = "url('img/FondsTextures/fondnuit.png')";
    }
    else if(element == "moment" && (reponse.json == "day" || reponse.json == "indifferent")){
      root.style.setProperty('--breadcrumb-color', "#9DF5FF");
      root.style.setProperty('--bouton-texte-color', "#203443");
      root.style.setProperty('--citation-color', "#203443");
      root.style.setProperty('--bouton-bg-color', '#203443');
      document.body.style.backgroundImage = "url('img/FondsTextures/fondjour.png')";
    }
    else if(element == "moment"){
      root.style.setProperty('--citation-color', "white");
      root.style.setProperty('--breadcrumb-color', "#D07BBC");
      root.style.setProperty('--bouton-texte-color', "#71265F");
      root.style.setProperty('--bouton-bg-color', '#49083A');
      document.body.style.backgroundImage = "url('img/FondsTextures/fondsoleil.png')";
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function resetDisplay(){
  let planteJour = document.getElementById("planteJour");
  let planteNuit = document.getElementById("planteNuit");
  let planteSoleil = document.getElementById("planteSoleil");
  planteJour.style.display = 'none';
  planteNuit.style.display = "none";
  planteSoleil.style.display = "none";
  let root = document.documentElement;
  root.style.setProperty('--breadcrumb-color', "#9DF5FF");
  root.style.setProperty('--bouton-texte-color', "#203443");
  root.style.setProperty('--citation-color', "#203443");
  root.style.setProperty('--bouton-bg-color', '#203443');
  document.body.style.backgroundImage = "url('img/FondsTextures/fonddebut.png')";
}