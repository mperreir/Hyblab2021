
let initSlide2 = function(){
  let contenu = {
    currentQuestionIndice: 0,
    questions : [
        {
            question : "Quelle est votre activité artistique ?",
            element: "activite",
            reponses : [
                {
                    "texte" : "Photographie",
                    "methode" : next,
                    "json": "photographie",
                    "citation" : '"La photographie est une brève complicité entre la prévoyance et le hasard." - John Stuart Mill'
                },
                {
                    "texte" : "Réalisation",
                    "methode" : next,
                    "json": "realisation"
                },
                {
                    "texte" : "écriture",
                    "methode" : next,
                    "json": "ecriture"
                },
                {
                  "texte" : "peinture",
                  "methode" : next,
                  "json" : "peinture"
                },
                {
                  "texte" : "Autres",
                  "methode" : next,
                  "json" : "autres"
                }
            ]
        },
        {
            question : "De quel type de plage souhaitez-vous pour vous inspirer ?",
            element: "type",
            reponses : [
                {
                    "texte" : "Sable",
                    "json": "sable"
                },
                {
                    "texte" : "Galet",
                    "json" : "galet",
                },
                {
                    "texte" : "Rochers",
                    "json" : "rochers",
                },
                {
                  "texte" : "Indifférent",
                  "json" : "indifferent",
              },
            ]
        },
        {
          question : "Quel moment de la journée voulez-vous ?",
          element: "moment",
          reponses : [
              {
                  "texte" : "Levée de soleil",
                  "json": "leverSoleil"
              },
              {
                  "texte" : "Couché du soleil",
                  "json" : "coucherSoleil",
              },
              {
                  "texte" : "Journée",
                  "json" : "journee",
              },
              {
                "texte" : "Nuit",
                "json" : "nuit",
            },
          ]
      },
      {
        question : "Quel type de ciel voulez vous avoir ?",
        element: "ciel",
        reponses : [
            {
                "texte" : "Clair",
                "json": "clair"
            },
            {
                "texte" : "Nuageux",
                "json" : "nuageux",
            },
            {
                "texte" : "Couvert",
                "json" : "couvert",
            },
            {
              "texte" : "Orageux",
              "json" : "orageux",
            },
            {
              "texte" : "Indifférent",
              "json" : "indifferent",
            }
        ]
      },
      {
        question : "Quelle type de marée voulez-vous avoir ?",
        element: "maree",
        reponses : [
            {
                "texte" : "Marée Haute",
                "json": "haute"
            },
            {
                "texte" : "Marée basse",
                "json" : "basse",
            },
            {
              "texte" : "Indifférent",
              "json" : "indifferent",
            }
        ]
      },
      {
        question : "Quelle type de mer voulez-vous avoir ?",
        element: "mer",
        reponses : [
            {
                "texte" : "Vagues",
                "json": "vagues"
            },
            {
                "texte" : "Calme",
                "json" : "calme",
            },
            {
              "texte" : "Indifférent",
              "json" : "indifferent",
            }
        ]
      },
      {
        question : "Quel type d'aménagement voulez vous à proximité ?",
        element: "amenagement",
        reponses : [
            {
                "texte" : "Phare",
                "json": "phare"
            },
            {
                "texte" : "Port",
                "json" : "port",
            },
            {
                "texte" : "Parking",
                "json" : "parking",
            },
            {
              "texte" : "Indifférent",
              "json" : "indifferent",
            }
        ]
      }
    ]
  }

  console.log(getAffichage());
  
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
        let affichage = getAffichage();
        affichage[question.element] = reponse.json;
        updateElement(question.element, reponse.json);
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