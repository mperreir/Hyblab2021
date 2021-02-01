'use strict';

/**
 * ==============================================
 *           CHOIX LEGENDE -> LEGENDE
 * ==============================================
 */

 /**
 * Function that handle the selection of a legend.
 * @param {number} idLegende the id of the selected legend.
 */
function selectLegende(idLegende, legendes){
	if(idLegende > 0) {
		window.onresize = null;
		router.loadRessources('legende', {
			department: router.data.department,
			personnage: router.data.personnage,
			legende: idLegende,
			departments: router.data.departments,
			personnages: router.data.personnages,
			legendes: legendes

		}, (router.data.personnage === 2) ? 2 : 1);
	}
}

/**
 * ==============================================
 *           CHOIX DEP -> CHOIX PERSO
 * ==============================================
 */

/**
 * Function that handle the selection of a region
 * @param {number} codeDep	the department code.
 */
function selectDepartment(codeDep, map){
	let id = map.getID(codeDep);
	console.log(id);
	if(id > 0) {
		window.onresize = null;
		router.loadRessources('personnages', {
			department: id,
			departments: map.validRegions
		}, 1);
	}
}

function selectCategorie(categorie, categories) {
	router.loadRessources('departement', {
		department: router.data.department,
		personnage: categorie.id,
		departements: router.data.departements,
		personnages: categories
	}, 3);
}
