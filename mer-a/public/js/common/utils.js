'use strict';

/**
 * Return the category with the id 'type'.
 * @param {number} type 	the id of the wanted type.
 */
function getCategorie(type) {
	if(router.data.personnages !== null && router.data.personnages !== undefined) return router.data.personnages.find(categorie => categorie.id === parseInt(type, ));
}

/**
 * Return the legend with the id 'id'.
 * @param {number} id 	the id of the wanted legende.
 */
function getLegende(id) {
	if(router.data.legendes !== null && router.data.legendes !== undefined) return router.data.legendes.find(legende => legende.id === id);
}

/**
 * Return the legend with the id 'id'.
 * @param {number} id 	the id of the wanted legende.
 */
function getDepartement(id) {
	if(router.data.departments !== null && router.data.departments !== undefined) return router.data.departments.find(dep => dep.id === id);
}

/**
 * Used to normalize a string so, that it can be used as an attribute.
 * @param {string} categorie    the string to normalize.
 * @return                      the normalized string.
 */
function formatCategorie(categorie) {
    return categorie.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(' ', '-').toLowerCase();
}
