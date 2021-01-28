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
  'Indice de Shanon arbres',
  'Elements atypiques'
]

 */
const PARCNUMBER = 92;
const fs = require('fs');
const Parc = require('./model/Parc');
const parcs = [];
for (let i = 0; i < PARCNUMBER; i++) {
    parcs.push(new Parc(i + 1));
}

let data = fs.readFileSync('parents-a/public/data/data.json');
data = JSON.parse(data);
keys = Object.keys(data);
keys.forEach(key => {
    Object.keys(data[key]).forEach(id => parcs[id].addAttribute(key, data[key][id]));
});

fs.writeFileSync('parents-a/public/data/formatedData.json', JSON.stringify(parcs));

