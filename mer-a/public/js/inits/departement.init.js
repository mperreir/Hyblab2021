'use strict';

/**
 * Specific constants definition
 */
var codeDep = getCodeDepartement(url);
var codeType = getCodeType(url);

var map = getMapDepartement(codeDep);

var baseNarration = {
	html: {
		box: document.getElementById('narration'),
		text: document.querySelector('#narration > span'),
		pass: document.querySelector('#narration > button.pass_narration')
	},
	animation: {
		text: null,
		index: 0,
		intervals: {
			narration: null
		}
	},
	properties: {
		boxHeight: 0
	}
};
var legendNarration = {
	html: {
		box: document.querySelector('#narration_legende'),
		title: document.querySelector('#narration_legende > span.title'),
		text: document.querySelector('#narration_legende > span.resume'),
		pass: document.querySelector('#narration_legende > button.pass_narration')
	},
	animation: {
		text: null,
		index: 0,
		intervals: {
			narration: null,
			timeout: null
		}
	},
	properties: {
		legendId: null
	}
};

var persoBox = document.getElementById('character');

/**
 * The main function in ASYNC.
 */
(async () => {
	console.log(map);
	await getLegendes(codeDep, codeType, r => legendes = r);
	if(!categories) await getTypesId(r => categories = r);
	if(!deps.data) await getRegionsId(r => deps.data = r);
	deps.data = [deps.get(map.properties.code)];
	categorie = getCategorie(codeType);
	baseNarration.animation.text = categorie.phraseDep;
	setNarrationBoxes();
	generateDep(mapFusion);
	loadCharacter();
	perso = document.getElementById('character_image');
	baseNarration.animation.intervals.narration = setInterval(narrate, narrationSpeed, baseNarration);
	setTimeout(() => perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`,500);
})();

/**
 * When the window is resized, we update the view.
 */
window.addEventListener("resize", function() {
	perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`;
	setNarrationBoxes();
	generateDep(mapFusion);
});
