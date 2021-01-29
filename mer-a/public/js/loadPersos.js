const persosBox = document.getElementsByClassName('personnages')[0];
let categories = null
const ordreCategories = [1,2,3];
const urlParts = window.location.href.split('/');
const departement = urlParts[urlParts.length-1] !== '' ? urlParts[urlParts.length-1] : urlParts[urlParts.length-2];

function formatCategorie(categorie) {
    return categorie.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(' ', '-').toLowerCase();
}

function sortCategories() {
    if(ordreCategories == null || ordreCategories == undefined || ordreCategories.length !== categories.length) return null;
    let orderedCats = new Array(categories.length);
    for(c of categories) {
        console.log(c);
        orderedCats[ordreCategories.indexOf(c.id)] = c;
    }
    console.log(orderedCats);
    return orderedCats;
}

(async () => {
    await getTypesId(r => categories = r);
    console.log(categories);
    categories = sortCategories();
    for(c of categories) {
        console.log(c);
        formatC = formatCategorie(c.nomCategorie);
        let zone = document.createElement('div');
        zone.classList.add('zone', `zone-${formatC}`);
        let textZone = document.createElement('div');
        textZone.classList.add('texte', 'categorie', `cat-${formatC}`);
        let nomPerso = document.createElement('p');
        nomPerso.innerHTML = c.nomPersonnage;
        let phrase = document.createElement('p');
        phrase.innerHTML = c.phraseCat;
        let linkNext = document.createElement('a');
        linkNext.href = `/mer-a/departement/${departement}/${c.id}`;
        linkNext.classList.add('choix', `choix-${formatC}`);
        let imagePerso = document.createElement('p');
        imagePerso.id = formatC;
        imagePerso.classList.add('perso');
        textZone.appendChild(nomPerso);
        textZone.appendChild(phrase);
        linkNext.appendChild(imagePerso);
        zone.appendChild(textZone);
        zone.appendChild(linkNext);
        persosBox.appendChild(zone);
    }
})();