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
	if(idLegende > 0) router.loadRessources('legende', {
		department: router.data.department,
		personnage: router.data.personnage,
		legende: idLegende
	}, (router.data.personnage === 2) ? 2 : 1);
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
	if(id > 0) router.loadRessources('personnages', {
		department: id
	}, 1);
}
