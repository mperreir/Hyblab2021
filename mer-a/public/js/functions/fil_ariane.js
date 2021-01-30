function color(step){
	step.style.background = "white";
}

function show(id_div, resource, fond) {
	let step = document.getElementById(id_div);
	color(step);
	step.style.opacity = 1;
	if(resource && fond) step.onclick = () => loadRessources(resource, {}, fond);
}

function ecrire(id_div, txt){
	let step = document.getElementById(id_div);
	let textBox = step.querySelector('div.text');
	if(textBox === null) {
		textBox = document.createElement('div');
		textBox.classList.add('text');
		step.appendChild(textBox);
	}
	textBox.innerHTML = txt;
	textBox.style.fontSize = Math.min((window.innerHeight*0.075 / (txt.length ** 0.5)), '24') + 'px';
}

function updateAriane(n, dep, perso, legend){
	switch(n){
		case 4:
			show('trait3');
			show('cercle_outer4');
		case 3:
			show('trait2');
			show('cercle_outer3', 'departement', 3);
			ecrire('cercle_outer3', legend);
		case 2 :
			show('trait1');
			show('cercle_outer2', 'personnages', 1);
			ecrire('cercle_outer2', perso);
		case 1:
			show('cercle_outer1', 'departements', 3);
			ecrire('cercle_outer1', dep);
	}
}
