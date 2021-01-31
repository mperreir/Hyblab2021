'use strict';

class Narrator {

	constructor(boxElement, textElement, passButton, speed, customElements, customIntervals, customProperties) {
		this.html = {
			box: boxElement,
			text: textElement,
			pass: passButton,
			custom: {}
		};
		this.html.pass.onclick = () => this.stop();
		if(customElements) Object.entries(customElements).forEach(([key, value]) => {
			this.html.custom[key] = value;
		});
		this.animation = {
			text: null,
			index: 0,
			speed: speed,
			intervals: {
				narration: null,
				custom: {}
			}
		};
		if(customIntervals) Object.entries(customIntervals).forEach(([key, value]) => {
			this.animation.intervals.custom[key] = value;
		});
		this.properties = {};
		if(customProperties) Object.entries(customProperties).forEach(([key, value]) => {
			this.properties[key] = value;
		});
	}

	setText(text) {
		if(!this.animation.intervals.narration)
			this.animation.text = text;
		else
			console.error('You can\'t modify the text at the moment, reset the animation.');
	}

	load(customNbRows, paramsRows) {
		let nbRows = customNbRows ? customNbRows(paramsRows) : this.getNbRows();
		this.html.box.style.height = `${narrationFontSize * 1.65 * nbRows + padding * 2}px`;
	}

	/**
	 * Fonction that display a text char by char.
	 */
	start() {
		this.animation.intervals.narration = setInterval(this.#narrate, this.animation.speed, this);
		this.html.pass.style.display = 'block';
	}

	/**
	 * Fonction that display a text char by char.
	 */
	getNbRows() {
		return this.animation.text.length / (this.html.box.offsetWidth / (narrationFontSize*0.6)) + 1;
	}

	/**
	 * Fonction that display a text char by char.
	 */
	#narrate(narrator) {
		if(!narrator) narrator = this;
		narrator.html.text.innerHTML += narrator.animation.text[narrator.animation.index];
		narrator.animation.index++;
		if(narrator.animation.text.length === narrator.animation.index) narrator.stop();
	}

	stop() {
		clearInterval(this.animation.intervals.narration);
		this.animation.intervals.narration = null;
		this.html.text.innerHTML = this.animation.text;
		this.html.pass.style.display = 'none';
	}

	reset() {
		clearInterval(this.animation.intervals.narration);
		this.animation.intervals.narration = null;
		Object.entries(this.animation.intervals.custom).forEach(([_, interval]) => { clearInterval(interval); });
		this.html.text.innerHTML = '';
		this.animation.index = 0;
	}

	/**
	 * Function to hide the box of the legends' narration.
	 */
	hide(narrator) {
		if(!narrator) narrator = this;
		narrator.reset();
		narrator.html.box.style.display = 'none';
	}

	/**
	 * Function to hide the box of the legends' narration.
	 */
	show() {
		this.html.box.style.display = 'block';
	}

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
function setNarrationBox() {
	baseNarrator.load();
	// let nbRows = baseNarrator.animation.text.length / (baseNarrator.html.box.offsetWidth / (narrationFontSize*0.6)) + 1;
	// baseNarrator.properties.boxHeight = narrationFontSize * 1.65 * nbRows + padding * 2;
	// baseNarrator.html.box.style.height = `${baseNarrator.properties.boxHeight}px`;
	baseNarrator.html.box.style.top = `-${baseNarrator.html.box.offsetHeight}px`;
	// baseNarrator.html.pass.onclick = () => baseNarrator.stopNarration();
}

/**
 * Function that initialize and load the narration of the legend with the corresponding id.
 * @param {number} id	the id of the legend to #narrate.
 */
function loadLegendNarration(id) {
	legendNarrator.reset();
	let legende = getLegende(id);
	legendNarrator.setText(legende.resume);
	legendNarrator.html.custom.title.innerHTML = legende.nom;
	legendNarrator.show();
	let nbRows = legendNarrator.getNbRows() + (legendNarrator.html.custom.title.innerHTML.length) / (legendNarrator.html.box.offsetWidth / (narrationFontSize*0.6)) + 1;
	legendNarrator.load(() => {
			return nbRows;
	});
	legendNarrator.html.box.style.top = `-${narrationFontSize * 1.65 * nbRows + padding * 2 + baseNarrator.html.box.offsetHeight + window.innerHeight*0.07}px`;
	legendNarrator.start();
	// legendNarration.html.box.style.display = 'block';
	// legendNarration.html.pass.style.display = 'block';
	// let nbRows = (legende.resume.length + legende.nom.length) / (legendNarration.html.box.offsetWidth / (narrationFontSize*0.6)) + 2;
	// legendNarration.html.box.style.height = `${narrationFontSize * 1.65 * nbRows + padding * 2}px`;
	// legendNarration.animation.text = legende.resume;
	// legendNarration.animation.intervals.narration = setInterval(#narrate, narrationSpeed, legendNarration);
}