'use strict';

class Narrator {

	constructor(boxElement, textElement, passButton, speed, customElements, customIntervals, customProperties) {
		console.log(passButton);
		console.log( $('#narration > button.pass_narration')[0]);
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
		let height = narrationFontSize * 1.65 * nbRows + padding * 2;
		this.html.box.style.height = `${height}px`;
		this.html.box.style.top = `-${height}px`;
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

function setNarrationToBase() {
	narrator.reset();
	narrator.html.custom.title.style.display = 'none';
	narrator.setText(narrator.properties.baseText);
	narrator.load();
	narrator.start();
}

/**
 * Initialise the view of the narration
 */
function setNarrationBox() {
	baseNarrator.load();
	// let nbRows = baseNarrator.animation.text.length / (baseNarrator.html.box.offsetWidth / (narrationFontSize*0.6)) + 1;
	// baseNarrator.properties.boxHeight = narrationFontSize * 1.65 * nbRows + padding * 2;
	// baseNarrator.html.box.style.height = `${baseNarrator.properties.boxHeight}px`;
	// baseNarrator.html.box.style.top = `-${baseNarrator.html.box.offsetHeight}px`;
	// baseNarrator.html.pass.onclick = () => baseNarrator.stopNarration();
}

/**
 * Function that initialize and load the narration of the legend with the corresponding id.
 * @param {number} id	the id of the legend to #narrate.
 */
function loadLegendNarration(id) {
	narrator.reset();
	let legende = getLegende(id);
	narrator.setText(legende.resume);
	narrator.html.custom.title.innerHTML = legende.nom + '<br/><br/>';
	narrator.html.custom.title.style.display = 'block';
	//narrator.show();
	let nbRows = narrator.getNbRows() + (narrator.html.custom.title.innerHTML.length) / (narrator.html.box.offsetWidth / (narrationFontSize*0.6)) + 1;
	narrator.load(() => {
			return nbRows;
	});
	narrator.start();


	// legendNarrator.reset();
	// let legende = getLegende(id);
	// legendNarrator.setText(legende.resume);
	// legendNarrator.html.custom.title.innerHTML = legende.nom;
	// legendNarrator.show();
	// let nbRows = legendNarrator.getNbRows() + (legendNarrator.html.custom.title.innerHTML.length) / (legendNarrator.html.box.offsetWidth / (narrationFontSize*0.6)) + 1;
	// legendNarrator.load(() => {
	// 		return nbRows;
	// });
	// legendNarrator.start();


	// legendNarrator.html.box.style.top = `-${narrationFontSize * 1.65 * nbRows + padding * 2 + baseNarrator.html.box.offsetHeight + window.innerHeight*0.07}px`;
	// legendNarration.html.box.style.display = 'block';
	// legendNarration.html.pass.style.display = 'block';
	// let nbRows = (legende.resume.length + legende.nom.length) / (legendNarration.html.box.offsetWidth / (narrationFontSize*0.6)) + 2;
	// legendNarration.html.box.style.height = `${narrationFontSize * 1.65 * nbRows + padding * 2}px`;
	// legendNarration.animation.text = legende.resume;
	// legendNarration.animation.intervals.narration = setInterval(#narrate, narrationSpeed, legendNarration);
}