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
	if(globalLegendes !== null) return globalLegendes.find(legende => legende.id === id);
}

/**
 * Return the legend with the id 'id'.
 * @param {number} id 	the id of the wanted legende.
 */
function getDepartement(id) {
	if(departements !== null) return departements.find(dep => dep.id === id);
}

/**
 * Used to normalize a string so, that it can be used as an attribute.
 * @param {string} categorie    the string to normalize.
 * @return                      the normalized string.
 */
function formatCategorie(categorie) {
    return categorie.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(' ', '-').toLowerCase();
}
