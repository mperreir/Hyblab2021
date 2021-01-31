'use strict';

/**
 * Return the category with the id 'type'.
 * @param {number} type 	the id of the wanted type.
 */
function getCategorie(type) {
	if(categories !== null) return categories.find(categorie => categorie.id === parseInt(type, ));
}

/**
 * Return the legend with the id 'id'.
 * @param {number} id 	the id of the wanted legende.
 */
function getLegende(id) {
	if(legendes !== null) return legendes.find(legende => legende.id === id);
}

/**
 * Return the legend with the id 'id'.
 * @param {number} id 	the id of the wanted legende.
 */
function getDepartement(id) {
	if(departements !== null) return departements.find(dep => dep.id === id);
}

/**
 * Function that return the ID of a region from it's code.
 * @param {number} code 	the department code.
 */
function getID(code){
	return Map.isValid(code) ? code : -1;
}

/**
 * Used to normalize a string so, that it can be used as an attribute.
 * @param {string} categorie    the string to normalize.
 * @return                      the normalized string.
 */
function formatCategorie(categorie) {
    return categorie.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(' ', '-').toLowerCase();
}
