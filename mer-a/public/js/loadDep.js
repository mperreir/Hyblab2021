'use strict'

/**
 * The file used to load the map of the region with the character.
 */

/**
 * Constants definition
 */
const url = window.location.href;
const codeDep = getCodeDepartement(url);
const codeType = getCodeType(url);

const map = getMapDepartement(codeDep);

const baseNarration = {
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
const legendNarration = {
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

const persoBox = document.getElementById('character');

const fontSize = window.innerHeight*0.023;
const padding = window.innerHeight*0.008;

let perso = null;
let categories = null;
let categorie = null;
let legendes = null;

function generateDep(mapData){

	var width = window.innerWidth;
	var height = window.innerHeight;

	var svg = d3.select("#department")
		.html('')
		.append('svg')
		.attr("width", width)
		.attr("height", height);

	// Place le centre de la map
	var center = d3.geoCentroid(map);
	//console.log(map);
	//console.log(center);

	// Projection des longitudes et latitudes
	var projection = d3.geoMercator()
		.center(center)
		.scale(width*16)
		.translate([ width /2, height/2 ])

	var path = d3.geoPath().projection(projection);

	// Dessine la map
	svg.append("g")
		.selectAll("path")
		.data(mapData.features)
		.enter()
		.append("path")
			.attr('id',function(d) { return 'path_' + d.properties.code})
			.attr("fill", function(d){return setColor(d, codeDep);})
			.attr("d", path)
			.style('stroke','black')
			.style('stroke-width', '1px');

	// Dessine les points des différents lieux à visiter
	svg.selectAll("myCircles")
		.data(legendes)
		.enter()
		.append("circle")
			.attr("id", function(d){ return 'dot_legende_' + d.id; })
			.attr("lbl-legende-id", function(d){ return d.id; })
			.attr("cx", function(d){ return projection([d.longitude, d.latitude])[0]; })
			.attr("cy", function(d){ return projection([d.longitude, d.latitude])[1]; })
			.attr("r", 14)
			.style("fill", "white")
			.attr("stroke", "white")
			.attr("stroke-width", 3)
			.attr("fill-opacity", .5)
			.on('mouseover', function(d){
				hoverDot(this);
				document.getElementById('label_legende_' + this.getAttribute('lbl-legende-id')).style.display = 'block';
			})
			.on('mouseleave', function(d){
				leaveDot(this);
				document.getElementById('label_legende_' + this.getAttribute('lbl-legende-id')).style.display = 'none';
			})
			.on('click', d => selectLegende(d.id));

	for(let l of legendes) {
		let lButton = document.createElement('a');
		lButton.id = 'label_legende_' + l.id;
		lButton.setAttribute('lbl-legende-id', l.id);
		lButton.classList.add('legend_button'),
		lButton.style.left = projection([l.longitude, l.latitude])[0] + 'px';
		lButton.style.top = (projection([l.longitude, l.latitude])[1]-100) + 'px';
		lButton.innerHTML = l.nom;
		lButton.onmouseover = (e) => {
			e.target.style.display = 'block';
			hoverDot(document.getElementById('dot_legende_' + e.target.getAttribute('lbl-legende-id')));
		}
		lButton.onmouseleave = (e) => {
			e.target.style.display = 'none';
			leaveDot(document.getElementById('dot_legende_' + e.target.getAttribute('lbl-legende-id')));
		}
		document.getElementById('department').appendChild(lButton);
	}

}

function setColor(d, codeDep){
	let code = d.properties.code;
	return (code == codeDep) ? '#88cbce' : '#224255';

}

function hoverDot(t){
	d3.select(t)
		.transition().duration(350)
		.attr("r", 20)
		.style('cursor','pointer')
		.style("fill-opacity", 0.6);
	loadLegendNarration(parseInt(t.getAttribute('lbl-legende-id')));
}

function leaveDot(t){
	d3.select(t)
		.transition().duration(350)
		.attr("r", 14)
		.style('cursor','initial')
		.style("fill-opacity", 0.5);
	legendNarration.animation.intervals.timeout = setInterval(hideLegendNarration, 3000);
}

function getCodeDepartement(url){
	return url.split('/')[5];
}

function getCodeType(url){
	return parseInt(url.split('/')[6]);
}

function getMapDepartement(code){
	let f = null;
	for(let i in mapFusion.features){
		let feature = mapFusion.features[i];
		if(feature.properties.code == code){
			f = feature;
			break;
		}
	}
	return f;
}

function selectLegende(idLegende){
	if(idLegende > 0) document.location.href= `${ROOT}legende/${idLegende}`; 
}

function loadCharacter() {
	let imgChar = document.createElement('img');
	imgChar.src = ROOT + categorie.imageURI;
	imgChar.id = 'character_image';
	persoBox.appendChild(imgChar);
}

function narrate(narrator) {
	narrator.html.text.innerHTML += narrator.animation.text[narrator.animation.index];
	narrator.animation.index++;
	if(narrator.animation.text.length === narrator.animation.index) stopNarration(narrator);
}

function getCategorie(type) {
	for(let c of categories) {
		if(c.id === type) return c;
	}
}

function getLegende(id) {
	for(let l of legendes) {
		if(l.id === id) return l;
	}
}

function setNarrationBoxes() {
	let nbRows = baseNarration.animation.text.length / (baseNarration.html.box.offsetWidth / (fontSize*0.6667)) + 1;
	baseNarration.properties.boxHeight = fontSize * nbRows + padding * 2;
	baseNarration.html.box.style.height = `${baseNarration.properties.boxHeight}px`;
	baseNarration.html.box.style.top = `-${baseNarration.properties.boxHeight}px`;
	baseNarration.html.pass.onclick = () => stopNarration(baseNarration);
	legendNarration.html.pass.onclick = () => stopNarration(legendNarration);
	legendNarration.html.box.style.display = 'none';
}

function loadLegendNarration(id) {
	resetLegendNarration();
	legendNarration.properties.legendId = id;
	let legende = getLegende(id);
	legendNarration.html.box.style.display = 'block';
	legendNarration.html.pass.style.display = 'block';
	let nbRows = (legende.resume.length + legende.nom.length) / (legendNarration.html.box.offsetWidth / (fontSize*0.6667)) + 2;
	legendNarration.html.box.style.height = `${fontSize * nbRows + padding * 2}px`;
	legendNarration.html.box.style.top = `-${fontSize * nbRows + padding * 2 + baseNarration.properties.boxHeight + window.innerHeight*0.07}px`;
	legendNarration.html.title.innerHTML = legende.nom;
	legendNarration.animation.text = legende.resume;
	legendNarration.animation.intervals.narration = setInterval(narrate, 45, legendNarration);
}

function resetLegendNarration() {
	clearInterval(legendNarration.animation.intervals.narration);
	clearInterval(legendNarration.animation.intervals.timeout);
	legendNarration.html.text.innerHTML = '';
	legendNarration.animation.index = 0;
}

function hideLegendNarration() {
	clearInterval(legendNarration.animation.intervals.timeout);
	legendNarration.html.box.style.display = 'none';
	legendNarration.animation.index = 0;
}

function stopNarration(narrator) {
	clearInterval(narrator.animation.intervals.narration);
	narrator.html.text.innerHTML = narrator.animation.text;
	narrator.html.pass.style.display = 'none';
}

(async () => {
	await getLegendes(codeDep, codeType, r => legendes = r);
	await getTypesId(r => categories = r);
	categorie = getCategorie(codeType);
	baseNarration.animation.text = categorie.phraseDep;
	setNarrationBoxes();
	generateDep(mapFusion);
	loadCharacter();
	perso = document.getElementById('character_image');
	baseNarration.animation.intervals.narration = setInterval(narrate, 45, baseNarration);
	setTimeout(() => perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`,500);
})();

window.addEventListener("resize", function(e) {
	perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`;
	setNarrationBoxes();
	generateDep(mapFusion);
});
