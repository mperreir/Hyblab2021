/*
// Liste of keys:
[
  'Nom',
  'Type',
  'Adresse',
  'Code postal',
  'Commune',
  'Accès transports en commun',
  'Gardien',
  'Jeux pour enfants',
  'Pataugeoire',
  'Sanitaires',
  'Sanitaires pour handicapés',
  'Chiens autorisés',
  'Jardin clos',
  'Abris',
  "Point d'eau",
  'Table pique-nique',
  'Animaux',
  'Nb arbre',
  'Nb espece arbre',
  'Nb genre arbre',
  'Nb arbre formidable',
  'Nb plantes',
  'Nb Famille plantes',
  'Nb Genre plantes',
  'Nb Espece plantes',
  'Indice de Shanon plantes',
  'Indice de Shanon arbres'
]

 */

class Parc {
    constructor(id) {
        this.id = id;
    }

    addAttribute(atr, value){
        this[atr] = value;
    }
}

module.exports  = Parc;
