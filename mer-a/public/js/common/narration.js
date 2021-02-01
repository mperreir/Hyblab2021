'use strict';

class Narrator {

	defaultSpeed = 45; // 0 : instant ; 1000 : every second.
	fontSize = window.innerHeight*0.023;
	padding = window.innerHeight*0.008;

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
		let height = this.fontSize * 1.65 * nbRows + this.padding * 2;
		this.html.box.style.height = `${height}px`;
		this.html.box.style.top = `-${height}px`;
	}

	/**
	 * Fonction that display a text char by char.
	 */
	start() {
		this.animation.intervals.narration = setInterval(this.narrate, this.animation.speed, this);
		this.html.pass.style.display = 'block';
	}

	/**
	 * Fonction that display a text char by char.
	 */
	getNbRows() {
		console.log(this.animation.text.length / (this.html.box.offsetWidth / (this.fontSize*0.6)) + 1);
		return this.animation.text.length / (this.html.box.offsetWidth / (this.fontSize*0.6)) + 1;
	}

	/**
	 * Fonction that display a text char by char.
	 */
	narrate(narrator) {
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
 *           PAGE CHOIX LEGENDE
 * ======================================
 */

function loadBaseTextNarration(narrator) {
	narrator.reset();

	narrator.html.custom.title.style.display = 'none';

	narrator.setText(narrator.properties.baseText);
	narrator.load();
	narrator.html.text.innerHTML = narrator.animation.text;
}

/**
 * Function that initialize and load the narration of the legend with the corresponding id.
 * @param {number} id	the id of the legend to narrate.
 */
function loadLegendNarration(narrator, id) {
	narrator.reset();

	let legende = narrator.properties.legendes.find(l => l.id === id);
	narrator.html.custom.title.style.display = 'block';
	narrator.html.custom.title.innerHTML = legende.nom + '<br/><br/>';

	narrator.setText(legende.resume);
	let nbRows = narrator.getNbRows() + (legende.nom.length) / (narrator.html.box.offsetWidth / (narrator.fontSize*0.6)) + 1;
	narrator.load(() => {
			return nbRows;
	});
	narrator.start();
}