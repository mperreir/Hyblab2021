'use strict';

/**
 * Fonction that display a text char by char.
 * @param {object} narrator 	the object that defines a config for narration.
 */
function narrate(narrator) {
	narrator.html.text.innerHTML += narrator.animation.text[narrator.animation.index];
	narrator.animation.index++;
	if(narrator.animation.text.length === narrator.animation.index) stopNarration(narrator);
}

/**
 * Function to stop the narration of the passed narrator config.
 * @param {object} narrator 	the object that defines a config for narration.
 */
function stopNarration(narrator) {
	clearInterval(narrator.animation.intervals.narration);
	narrator.html.text.innerHTML = narrator.animation.text;
	narrator.html.pass.style.display = 'none';
}

/**
 * Function that add the character image to the page.
 */
function loadCharacter() {
	let imgChar = document.createElement('img');
	imgChar.src = ROOT + categorie.imageURI;
	imgChar.id = 'character_image';
	persoBox.appendChild(imgChar);
}

/**
 * ======================================
 * 
 *           PAGE CHOIX LEGENDE
 * 
 * ======================================
 */

/**
 * Initialise the view of the narration
 */
function setNarrationBoxes() {
	let nbRows = baseNarration.animation.text.length / (baseNarration.html.box.offsetWidth / (narrationFontSize*0.6)) + 1;
	baseNarration.properties.boxHeight = narrationFontSize * 1.65 * nbRows + padding * 2;
	baseNarration.html.box.style.height = `${baseNarration.properties.boxHeight}px`;
	baseNarration.html.box.style.top = `-${baseNarration.properties.boxHeight}px`;
	baseNarration.html.pass.onclick = () => stopNarration(baseNarration);
	legendNarration.html.pass.onclick = () => stopNarration(legendNarration);
	legendNarration.html.box.style.display = 'none';
}

/**
 * Function that initialize and load the narration of the legend with the corresponding id.
 * @param {number} id	the id of the legend to narrate.
 */
function loadLegendNarration(id) {
	resetLegendNarration();
	legendNarration.properties.legendId = id;
	let legende = getLegende(id);
	legendNarration.html.box.style.display = 'block';
	legendNarration.html.pass.style.display = 'block';
	let nbRows = (legende.resume.length + legende.nom.length) / (legendNarration.html.box.offsetWidth / (narrationFontSize*0.6)) + 2;
	legendNarration.html.box.style.height = `${narrationFontSize * 1.65 * nbRows + padding * 2}px`;
	legendNarration.html.box.style.top = `-${narrationFontSize * 1.65 * nbRows + padding * 2 + baseNarration.properties.boxHeight + window.innerHeight*0.07}px`;
	legendNarration.html.title.innerHTML = legende.nom;
	legendNarration.animation.text = legende.resume;
	legendNarration.animation.intervals.narration = setInterval(narrate, narrationSpeed, legendNarration);
}

/**
 * Function to reset the narration
 */
function resetLegendNarration() {
	clearInterval(legendNarration.animation.intervals.narration);
	clearInterval(legendNarration.animation.intervals.timeout);
	legendNarration.html.text.innerHTML = '';
	legendNarration.animation.index = 0;
}

/**
 * Function to hide the box of the legends' narration.
 */
function hideLegendNarration() {
	clearInterval(legendNarration.animation.intervals.timeout);
	legendNarration.html.box.style.display = 'none';
	legendNarration.animation.index = 0;
}