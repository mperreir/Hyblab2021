
let contenu = getQuestions();

function setTexte(id){
    let texte = document.getElementById("page-" + (id + 3)).querySelector("#questionText");
    let question = contenu.questions[id];
    texte.innerHTML = question.question;
    let containerReponses = document.getElementById("page-" + (id + 3)).querySelector("#containerReponses");
    containerReponses.innerHTML = "";
    if(question.multiple){
      for(let reponse of question.reponses){
        let containerReponse = document.createElement("div");
        containerReponse.setAttribute("class", "containerReponse");
  
        let newReponse = document.createElement("div");
        newReponse.innerHTML = reponse.texte;
        newReponse.setAttribute("class", "bouton");
        containerReponse.appendChild(newReponse);
  
        if(reponse.citations){
          let citation = document.createElement("div");
          citation.setAttribute("class", "citation");
          citation.innerHTML = reponse.citations[getRandomInt(reponse.citations.length)];
          containerReponse.appendChild(citation);  
        }

        containerReponses.appendChild(containerReponse);
  
        newReponse.addEventListener("click", function(element){
          if(element.target.classList.contains("boutonVisited")){
            element.target.setAttribute("class", "bouton");
          }
          else {
            element.target.setAttribute("class", "boutonVisited");
          }
          updateElement(question.element, reponse);
          //next(id + 1);
        });
      }

      let containerReponse = document.createElement("div");
      containerReponse.setAttribute("class", "containerReponse");

      let newReponse = document.createElement("div");
      newReponse.innerHTML = "<i class='material-icons'>east</i>";
      newReponse.setAttribute("class", "materialBouton");
      containerReponse.appendChild(newReponse);

      containerReponses.appendChild(containerReponse);

      newReponse.addEventListener("click", function(){
        //updateElement(question.element, reponse);
        next(id + 1);
      });
    }
    else {
      for(let reponse of question.reponses){
        let containerReponse = document.createElement("div");
        containerReponse.setAttribute("class", "containerReponse");
  
        let newReponse = document.createElement("div");
        newReponse.innerHTML = reponse.texte;
        newReponse.setAttribute("class", "bouton");
        containerReponse.appendChild(newReponse);
  
        if(reponse.citations){
          let citation = document.createElement("div");
          citation.setAttribute("class", "citation");
          citation.innerHTML = reponse.citations[getRandomInt(reponse.citations.length)];
          containerReponse.appendChild(citation);  
        }
  
        containerReponses.appendChild(containerReponse);
  
        newReponse.addEventListener("click", function(){
          updateElement(question.element, reponse);
          next(id + 1);
        });
      }
    }
    
  }

  function next(id){
    if(id + 1 < contenu.questions.length){
      mySlidr.slide('page-' + (id + 3));
      setTexte(id);
    }
    else {
      mySlidr.slide('page-fin');
      initSlideFin();
    }
  }

  
let initSlide3 = function(){
    setTexte(0);
};