'use strict';

// document.querySelector("")

/**
 * The file that loads the characters from the API.
 */

/**
 * Constants definition
 */
const persosBox = document.getElementsByClassName('personnages')[0];
const ordreCategories = [1,2,3];
const urlParts = window.location.href.split('/');
const departement = document.querySelector('#content').dataset.department;

/**
 *  Variables definition
 */
let categories = null

/**
 * Used to normalize a string so, that it can be used as an attribute.
 * @param {string} categorie    the string to normalize.
 * @return                      the normalized string.
 */
function formatCategorie(categorie) {
    return categorie.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(' ', '-').toLowerCase();
}

/**
 * Used to format the text in the database in HTML.
 * @param {string} text     text to format.
 * @return                  formatted text.
 */
function formatText(text) {
    let textParts = text.split('\n');
    let textHTML = '';
    for(let p of textParts) {
        textHTML += `<p>${p}</p>\n`;
    }
    return textHTML;
}

/**
 * Used to sort the categories retrived from the API to the showing order.
 * @return the sorted categories.
 */
function sortCategories() {
    if(ordreCategories == null || ordreCategories == undefined || ordreCategories.length !== categories.length) return null;
    let orderedCats = new Array(categories.length);
    for(let c of categories) {
        console.log(c);
        orderedCats[ordreCategories.indexOf(c.id)] = c;
    }
    console.log(orderedCats);
    return orderedCats;
}

/**
 * The main function in ASYNC.
 */
(async () => {
    // Retrieve data from the API
    await getTypesId(r => categories = r);
    console.log(categories);
    // Sort the data
    categories = sortCategories();
    // For each category we create the HTML component
    for(let c of categories) {
        console.log(c);
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
                department: departement,
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
