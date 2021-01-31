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
	for(let l of legendes) {
		if(l.id === id) return l;
	}
}

function getCodeDepartement(){
	return router.data.department;
}

function getCodeType(){
	return router.data.personnage;
}

/**
 * Function that extract the type id from the URL.
 */
function getCodeLegende(){
	return router.data.legende;
}

/**
 * Variables definition
 */
// transformer en classe TODO
let deps = {
	// regions
	data: null,
	// depart valide ?
	isValid: (code) => {
		if(deps.data !== null) return ((deps.data.find(data => data.id === code)) !== undefined) ? true : false;
	},
	// retourne depart depuis son code
	get: (code) => {
		if(deps.data !== null) return deps.data.find(data => data.id === code);
	}
};

/**
 * Function that return the ID of a region from it's code.
 * @param {number} code 	the department code.
 */
function getID(code){
	return deps.isValid(code) ? code : -1;
}

/**
 * Used to normalize a string so, that it can be used as an attribute.
 * @param {string} categorie    the string to normalize.
 * @return                      the normalized string.
 */
function formatCategorie(categorie) {
    return categorie.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(' ', '-').toLowerCase();
}
