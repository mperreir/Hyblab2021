'use strict';

/**
 * Return the category with the id 'type'.
 * @param {number} type 	the id of the wanted type.
 */
function getCategorie(type) {
	for(let c of categories) {
		if(c.id === parseInt(type, 10)) return c;
	}
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

/**
 * Function that extract the region id from the URL.
 */
function getCodeDepartement(){
	return parseInt(document.querySelector('#content').dataset.department);
}

/**
 * Function that extract the type id from the URL.
 */
function getCodeType(){
	return parseInt(document.querySelector('#content').dataset.personnage);
}

/**
 * Function that extract the type id from the URL.
 */
function getCodeLegende(){
	return parseInt(document.querySelector('#content').dataset.legende);
}

/**
 * Variables definition
 */
let deps = {data: null, isValid: (code) => {
				for(let d of deps.data) if(d.id === code) return true;
				return false;
			}, get: (code) => {
				for(let d of deps.data) if(d.id === code) return d;
			}};

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