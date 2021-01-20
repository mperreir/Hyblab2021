
let initSlide2 = function(){

  console.log(getAffichage());
  let contenu = getQuestions();
  console.log(contenu);
  
  function setTexte(){
    let texte = document.getElementById("questionText");
    let question = contenu.questions[contenu.currentQuestionIndice];
    texte.innerHTML = question.question;
    let containerReponse = document.getElementById("containerReponse");
    containerReponse.innerHTML = "";

    for(let reponse of question.reponses){
      let newReponse = document.createElement("div");
      newReponse.innerHTML = reponse.texte;
      newReponse.setAttribute("class", "bouton");
      containerReponse.appendChild(newReponse);

      newReponse.addEventListener("click", function(){
        updateElement(question.element, reponse);
        if(reponse.citation){
          console.log(reponse.citation);
        }
        next();
      });
    }
  }

  function next(){
    if(contenu.currentQuestionIndice + 1 < contenu.questions.length){
      contenu.currentQuestionIndice += 1;
      setTexte();
    }
    else {
      mySlidr.slide('page-3');
      initSlide3();
    }
  }

  setTexte();

};

function updateCitations(texte){
  let citationDiv = document.getElementById("citation");
  citationDiv.innerHTML = texte;
}