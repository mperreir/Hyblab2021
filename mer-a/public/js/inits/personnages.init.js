'use strict';

/**
 * Specific variables initialization
 */
persosBox = document.getElementsByClassName('personnages')[0];
codeDep = getCodeDepartement();

/**
 * The main function in ASYNC.
 */
(async () => {
	updateAriane(2, deps.get(codeDep).nomDepartement, 'catégorie');
    // Retrieve data from the API
    await getTypesId(r => categories = r);
    // Sort the data
    categories = sortCategories();
    // For each category we create the HTML component
    for(let c of categories) {
        let formatC = formatCategorie(c.nomCategorie);
        let zone = document.createElement('div');
        zone.classList.add('zone', `zone-${formatC}`);
        let textZone = document.createElement('div');
        textZone.classList.add('texte', 'categorie', `cat-${formatC}`);
        // let linkNext = document.createElement('a');
        // linkNext.href = `/mer-a/departement/${departement}/${c.id}`;
        // linkNext.classList.add('choix', `choix-${formatC}`);
        let imagePerso = document.createElement('p');
        imagePerso.id = formatC;
        imagePerso.addEventListener('click', () => {
            loadRessources('departement', {
                department: codeDep,
                personnage: c.id
            }, 3);
        });
        imagePerso.classList.add('perso');
        textZone.innerHTML = formatText(c.phrasePerso);
        // linkNext.appendChild(imagePerso);
        zone.appendChild(textZone);
        zone.appendChild(imagePerso);
        persosBox.appendChild(zone);
    }
})();