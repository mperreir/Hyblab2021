'use strict';

/**
 * Specific constants definition
 */

codeType = getCodeType();

map = getMapDepartement(codeDep);

persoBox = document.querySelector('#character');


/**
 * The main function in ASYNC.
 */
(async () => {
	await getLegendes(router.data.department, router.data.personnage, r => legendes = r);
	if(!categories) await getTypesId(r => categories = r);
	await getRegionsId(r => deps.data = r);

	let narrator = new Narrator($('#narration')[0], $('#narration > span.to-narrate')[0], $('#narration > button.pass_narration')[0], 45,
		{ title: $('#narration > span.title')[0] },
		{ timeout: null },
		{ baseText: null });
	deps.data = [deps.get(map.properties.code)];
	categorie = getCategorie(router.data.personnage);
	// baseNarrator.setText(categorie.phraseDep);
	narrator.setText(categorie.phraseDep);
	narrator.properties.baseText = categorie.phraseDep;
	narrator.load();
	// setNarrationBox();
	generateDep(mapFusion, narrator);
	loadCharacter();
	perso = document.getElementById('character_image');
	// baseNarrator.start();
	narrator.start();
	setTimeout(() => perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`,500);
	/**
	* When the window is resized, we update the view.
	*/
	window.addEventListener("resize", function() {
		perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`;
		narrator.load();
		// setNarrationBox();
		generateDep(mapFusion, narrator);
	});
})();
