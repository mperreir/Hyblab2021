'use strict';

(async () => {
  const ordreCategories = [1,2,3];
  let categories = null;
  await getTypesId(r => categories = r);
  // Sort the data
  categories = sortCategories(categories, ordreCategories);
  // For each category we create the HTML component
  categories.forEach(categorie => {
    createHTMLComponent(categorie);
  });
  particlesJS.load('particles-js', 'assets/data/particles_persos.json', function() { });

  function createHTMLComponent(categorie) {
    const nom = formatCategorie(categorie.nomCategorie);
    const zone = document.createElement('div');
    zone.classList.add('zone', `zone-${nom}`);

    const textZone = document.createElement('div');
    textZone.classList.add('texte', 'categorie', `cat-${nom}`);
    textZone.innerHTML = formatText(categorie.phrasePerso);

    const imagePerso = document.createElement('p');
    imagePerso.id = nom;
    imagePerso.addEventListener('click', () => selectCategorie(categorie, categories));
    imagePerso.classList.add('perso');
    zone.appendChild(textZone);
    zone.appendChild(imagePerso);
    document.querySelector('.personnages').appendChild(zone);
  }
})();
