'use strict';

/**
 * ==============================================
 * 
 *           CHOIX LEGENDE -> LEGENDE
 * 
 * ==============================================
 */

 /**
 * Function that handle the selection of a legend.
 * @param {number} idLegende the id of the selected legend.
 */
function selectLegende(idLegende){
	if(idLegende > 0) loadRessources('legende', {
		legende: idLegende
	}, 1);
}

/**
 * ==============================================
 * 
 *           CHOIX DEP -> CHOIX PERSO
 * 
 * ==============================================
 */

/**
 * Function that handle the selection of a region
 * @param {number} codeDep	the department code.
 */
function selectDepartment(codeDep){
	let id = getID(codeDep);
	if(id > 0) loadRessources('personnages', {
		department: id
	}, 1);
}