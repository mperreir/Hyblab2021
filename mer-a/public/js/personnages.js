'use strict';

(async () => {
  await getTypesId(r => categories = r);
  // Sort the data
  categories = sortCategories();
  // For each category we create the HTML component
  categories.forEach(categorie => {
    createHTMLComponent(categorie);
  });

  function createHTMLComponent(categorie) {
    const nom = formatCategorie(categorie.nomCategorie);
    const zone = document.createElement('div');
    zone.classList.add('zone', `zone-${nom}`);

    const textZone = document.createElement('div');
    textZone.classList.add('texte', 'categorie', `cat-${nom}`);
    textZone.innerHTML = formatText(categorie.phrasePerso);

    const imagePerso = document.createElement('p');
    imagePerso.id = nom;
    imagePerso.addEventListener('click', () => {
      router.loadRessources('departement', {
        department: router.data.department,
        personnage: categorie.id
      }, 3);
    });
    imagePerso.classList.add('perso');
    zone.appendChild(textZone);
    zone.appendChild(imagePerso);
    document.querySelector('.personnages').appendChild(zone);
  }
})();
