'use strict';

/**
 * ======================================
 * 
 *           PAGE CHOIX LEGENDE
 * 
 * ======================================
 */

/**
 * Function that add the character image to the page.
 */
function loadCharacter(container) {
	let imgChar = document.createElement('img');
	imgChar.src = router.ROOT + getCategorie(router.data.personnage).imageURI;
	imgChar.id = 'character_image';
	container.appendChild(imgChar);
}

/**
 * ====================================
 * 
 *           PAGE CHOIX PERSO
 * 
 * ====================================
 */

/**
 * Used to sort the categories retrived from the API to the showing order.
 * @return the sorted categories.
 */
function sortCategories(categories, ordreCategories) {
    if(ordreCategories == null || ordreCategories == undefined || ordreCategories.length !== categories.length) return null;
    let orderedCats = new Array(categories.length);
    for(let c of categories) {
        orderedCats[ordreCategories.indexOf(c.id)] = c;
    }
    return orderedCats;
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