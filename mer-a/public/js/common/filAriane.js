class FilAriane {
	constructor() {}

	#color(step) {
		if(step !== null) step.style.background = "white";
	}

	#show(id_div, ressource, fond) {
		let step = document.querySelector(`#${id_div}`);
		if(step !== null) {
			this.#color(step);
			step.style.opacity = 1;
			if(ressource && fond){
				step.classList.add('active');
				step.onclick = () => router.loadRessources(ressource, router.data, fond);
			}
		}
	}

	#ecrire(id_div, txt) {
		let step = document.querySelector(`#${id_div}`);
		if(step !== null) {
			let textBox = step.querySelector('div.text');
			if(textBox === null) {
				textBox = document.createElement('div');
				textBox.classList.add('text');
				step.appendChild(textBox);
			}
			textBox.innerHTML = txt;
			textBox.style.fontSize = `${Math.min((window.innerHeight*0.075 / (txt.length ** 0.5)), '24')}px`;
		}
	}

	#getIdByName(name) {
		switch (name) {
			case 'departements':
				return 1;
				break;

			case 'personnages':
				return 2;
				break;

			case 'departement':
				return 3;
				break;

			case 'legende':
				return 4;
				break;
		}
		return null;
	}

	updateAriane(name, dep, perso, legend){
		switch(this.#getIdByName(name)){
			case 4:
				this.#show('trait3');
				this.#show('cercle_outer4');
			case 3:
				this.#show('trait2');
				this.#show('cercle_outer3', 'departement', 3);
				this.#ecrire('cercle_outer3', legend);
			case 2 :
				this.#show('trait1');
				this.#show('cercle_outer2', 'personnages', 1);
				this.#ecrire('cercle_outer2', perso);
			case 1:
				this.#show('cercle_outer1', 'departements', 3);
				this.#ecrire('cercle_outer1', dep);
		}
	}
}
