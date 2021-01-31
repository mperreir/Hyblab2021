'use strict';

/**
 * Specific constants definition
 */

codeType = getCodeType();

map = getMapDepartement(codeDep);

let baseNarrator = new Narrator($('#narration')[0], $('#narration > span')[0], $('#narration > button.pass_narration')[0], 45);
// {
// 	html: {
// 		box: document.querySelector('#narration'),
// 		text: document.querySelector('#narration > span'),
// 		pass: document.querySelector('#narration > button.pass_narration')
// 	},
// 	animation: {
// 		text: null,
// 		index: 0,
// 		intervals: {
// 			narration: null
// 		}
// 	},
// 	properties: {
// 		boxHeight: 0
// 	}
// };

let legendNarrator = new Narrator($('#narration_legende')[0], $('#narration_legende > span.resume')[0], $('#narration_legende > button.pass_narration')[0], 45,
					{ title: $('#narration_legende > span.title')[0] },
					{ timeout: null });
// {
// 	html: {
// 		box: document.querySelector('#narration_legende'),
// 		title: document.querySelector('#narration_legende > span.title'),
// 		text: document.querySelector('#narration_legende > span.resume'),
// 		pass: document.querySelector('#narration_legende > button.pass_narration')
// 	},
// 	animation: {
// 		text: null,
// 		index: 0,
// 		intervals: {
// 			narration: null,
// 			timeout: null
// 		}
// 	},
// 	properties: {
// 		legendId: null
// 	}
// };

persoBox = document.querySelector('#character');


/**
 * The main function in ASYNC.
 */
(async () => {

	await getLegendes(router.data.department, router.data.personnage, r => legendes = r);
	if(!categories) await getTypesId(r => categories = r);
	await getRegionsId(r => deps.data = r);
	deps.data = [deps.get(map.properties.code)];
	categorie = getCategorie(router.data.personnage);
	baseNarrator.setText(categorie.phraseDep);
	setNarrationBox();
	generateDep(mapFusion);
	loadCharacter();
	perso = document.getElementById('character_image');
	baseNarrator.start();
	setTimeout(() => perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`,500);
	/**
	* When the window is resized, we update the view.
	*/
	window.addEventListener("resize", function() {
		perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`;
		setNarrationBox();
		generateDep(mapFusion);
	});
})();
