let affichage = {
    "activite" : "",
    "type" : "",
    "moment" : "",
    "ciel": "",
    "mer": "",
    "amenagement" :"",
    "longitude" : "",
    "latitude": ""
}

function getAffichage(){
    return affichage;
}

function affichageReset(){
    affichage = {
        "activite" : "",
        "type" : "",
        "moment" : "",
        "ciel": "",
        "mer": "",
        "amenagement" :"",  
        "longitude" : affichage.longitude,
        "latitude": affichage.latitude
    }

    sketchCiel.updateSketchCiel();
}

  function getQuestions(){
      return {
        currentQuestionIndice: 0,
        questions : [
            {
                question : "Quelle est votre passion artistique ?",
                element: "activite",
                reponses : [
                    {
                        "texte" : "Photographie",
                        "json": "photographie",
                        "citations" : ['"La photographie est une brève complicité entre la prévoyance et le hasard." - John Stuart Mill',
                        '"L\'appareil photographique, c\'est l\'œil au bout des doigts" - Claude Batho',
                        '"La photographie peut fixer l\'éternité dans un instant" - Robert Bresson'
                        ]
                    },
                    {
                        "texte" : "Réalisation",
                        "json": "realisation",
                        "citations" : [
                            '"Le cinéma, c\'est un stylo, du papier et des heures à observer le monde et les gens" - Jacques Tati',
                            'Le cinéma est fait pour tous ceux dont la curiosité est le plus grand défaut" - Claude Lelouch',
                            'Le cinéma, c\'est l\'écriture moderne dont l\'encre est la lumière" - Jean Cocteau'
                        ]
                    },
                    {
                        "texte" : "écriture",
                        "json": "ecriture",
                        "citations" : [
                            '"Les paroles vont comme le vent ; les écrits restent."',
                            '"L\'écriture est un scalpel pour voir comment la nature humaine fonctionne" - Phillipe Claudel',
                            '"L\'écriture est un luxe, l\'écriture est un bonheur, l\'écriture est une liberté" - André Compte-Sponville'
                        ]
                    },
                    {
                      "texte" : "Peinture",
                      "json" : "peinture",
                      "citations" : [
                          '"La peinture, c\'est la face visible de l\'iceberg de ma pensée" - Salvador Dali',
                          '"La peinture vient de l\'endroit où les mots ne peuvent plus s\'exprimer" - Gao Xingjian',
                          '"L\'art de peindre n\'est que l\'art d\'exprimer l\'invisible par le visible" - Eugène Fromentin'
                      ]
                    },
                    {
                      "texte" : "Autres",
                      "json" : "autres"
                    }
                ]
            },
            
            {
                question : "A quel moment de la journée êtes-vous le plus inspiré ?",
                element: "moment",
                reponses : [
                    {
                        "texte" : "Aube",
                        "json": "aube",
                        "citations": [
                            '"L\'aube, un isolement entre la nuit et le jour" - Dominique Blondeau',
                            '"Enfants, vous êtes l\'aube et mon âme est la plaine" - Victor Hugo',
                            '"A l\'aube d\'un nouvel amour, que l\'amour d\'hier semble un mauvais rêve" - Paul-Jean Toulet'
                        ]
                    },
                    {
                        "texte" : "Journée",
                        "json" : "journee",
                        "citations": [
                            '"Attachons-nous à reconnaître le caractère précieux de chaque journée" - Dalai Lama',
                            '"Ce qu\'on pense être difficile prend une journée, ce qu\'on pense être impossible prend une semaine" - Jay-Z'
                        ]
                    },
                    {
                        "texte" : "Crépuscule",
                        "json" : "crepuscule",
                        "citations": [
                            '“Le crépuscule d\'un homme voit se lever l\'aube d\'un autre.”',
                            '"Amitié, doux repos de l\'âme, crépuscule charmant des cœurs" - Alphonse de Lamartine'
                        ]
                    },
                    {
                      "texte" : "Nuit",
                      "json" : "nuit",
                      "citations": [
                          '“La nuit la plus sombre a toujours une fin lumineuse.”',
                          '"Il faut toujours viser la lune, car même en cas d\'échec, on atterrit dans les étoiles" - Oscar Wilde',
                          '"La nuit, on pense mieux, la tête est moins pleine de bruits" - Victor Hugo'
                      ]
                    },
                    {
                      "texte" : "Indifférent",
                      "json" : "indifferent",
                    },
                ]
            },
            {
                question : "Quel environnement vous permet d'explorer votre créativité ?",
                element: "type",
                reponses : [
                    {
                        "texte" : "Sable",
                        "json": "sable",
                        "citations": [
                            'Il y a 10^21 grains de sable sur Terre.',
                            'Certains sables sont d\'origine minérale, d\'autres organique.',
                            'Le sable blanc des atolls est constitué de fragments de coraux, de coquillages et de squelettes d\'organismes.'
                        ]
                    },
                    {
                        "texte" : "Galets",
                        "json" : "galets",
                        "citations": [
                            'Le record du monde de ricochets s\'élève à 88 rebonds.',
                            'On trouve des plages de galets surtout en Europe.'
                        ]
                    },
                    {
                        "texte" : "Rochers",
                        "json" : "rochers",
                        "citations": [
                            'Les rochers les plus anciens peuvent avoir plus d\'un milliard d\'années.'
                        ]
                    },
                    {
                      "texte" : "Indifférent",
                      "json" : "indifferent",
                  },
                ]
            },
            {
                question : "Quelle type de mer voulez-vous avoir ?",
                element: "mer",
                reponses : [
                    {
                        "texte" : "Agitee",
                        "json": "agitee"
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
            question : "Quelle météo serait la plus favorable pour la création ?",
            element: "ciel",
            reponses : [
                {
                    "texte" : "Clair",
                    "json": "clair",
                    "citations": [
                        '"Gardez votre visage dans le soleil et vous ne verrez pas les ombres" - Helen Keller',
                        '"Le temps que l\'on donne à un ami est toujours du beau temps, quelque soit la météo"'
                    ]
                },
                {
                    "texte" : "Nuageux",
                    "json" : "nuageux",
                    "citations": [
                        '"Les souvenirs sont du vent, ils inventent les nuages" - Jules Supervielle',
                        '“Exprimer ses émotions, c\'est comme d\'enlever les nuages noirs devant le soleil pour laisser pousser les fleurs.” - Tanya Sénécal'
                    ]
                },
                {
                  "texte" : "Indifférent",
                  "json" : "indifferent",
                },
                {
                    "texte" : "Pluie",
                    "json" : "pluie",
                    "citations": [
                        '"Les souvenirs sont du vent, ils inventent les nuages" - Jules Supervielle',
                        '“Exprimer ses émotions, c\'est comme d\'enlever les nuages noirs devant le soleil pour laisser pousser les fleurs.” - Tanya Sénécal'
                    ]
                },
                {
                  "texte" : "Orageux",
                  "json" : "orageux",
                  "citations": [
                      '"La vie, ce n\'est pas d\'attendre que les nuages passent, c\'est d\'apprendre à danser sous la pluie" - Sénèque',
                      '"Le repos est un rêve; la vie est un orage" - George Sand'
                  ]
                }
            ]
          },
          {
            question : "Quels aménagements souhaiteriez-vous à proximité ?",
            element: "amenagement",
            multiple: true,
            reponses : [
                {
                    "texte" : "Phare",
                    "json": "phare"
                },
                {
                    "texte" : "Port",
                    "json" : "port",
                }
            ]
          },
          {
            question : "Etes vous prêt à trouver la plage de vos rêves ?",
            element: "fin",
            reponses : [
                {
                    "texte" : "Oui",
                    "json": "phare"
                }
            ]
          }
        ]
      };
  }

  function getPlages(){
      let urlGet = 'http://localhost:8080/mer-b/api/plage/';
      if(affichage.longitude){
          urlGet += 'longitude=' + affichage.longitude + "&";
      }
      if(affichage.latitude){
          urlGet += 'latitude=' + affichage.latitude + "&";
      }
      
      if(affichage.type != 'indifferent'){
          urlGet += 'type=' + affichage.type + "&"; 
      }
      if(affichage.moment != 'indifferent'){
          urlGet += 'time=' + affichage.moment + '&';
      }
      if(affichage.maree != 'indifferent'){
          urlGet += 'tide=' + affichage.maree + '&';
      }
      if(affichage.ciel != 'indifferent'){
          urlGet += 'weather=' + affichage.ciel + '&';
      }
      if(affichage.mer != 'indifferent'){
          urlGet += 'sea=' + affichage.mer + '&';
      }
      if(affichage.amenagement != 'indifferent'){
          urlGet += 'planning=' + affichage.amenagement;
      }
      console.log(urlGet);

      fetch(urlGet).then(function(response) {
        response.json().then(function(object) {
          console.log(object);
        });
      });
      
  }