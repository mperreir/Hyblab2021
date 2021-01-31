class FilAriane {
	constructor() {}

	#color(step) {
		if(step !== null) step.style.background = "white";
	}

	#show(id_div, ressource, fond) {
		let step = document.querySelector(`#${id_div}`);
		if(step !== null){
			step.classList.add('active');
			if(ressource && fond){
				step.onclick = () => router.loadRessources(ressource, router.data, fond);
			}
		}
	}

	#reset() {
		var cercles = document.getElementsByClassName('cercle_outer');
		for (let i = 0 ; i < cercles.length; i++){
			cercles[i].classList.remove('active');
			cercles[i].onclick = null;
			if(cercles[i].children.length > 1) cercles[i].removeChild(cercles[i].children[1]);
		}
		var traits = document.getElementsByClassName('trait');
		for (let i = 0 ; i < traits.length; i++){
			traits[i].classList.remove('active');
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
		this.#reset();
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
