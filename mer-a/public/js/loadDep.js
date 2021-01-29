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

/*const*/ fontSize = window.innerHeight*0.023;
const padding = window.innerHeight*0.008;

const narrationSpeed = 45; // 0 : instant ; 1000 : every second.

/**
 * Variables definition
 */
let perso = null;
//let categories = null;
let categorie = null;
let legendes = null;

/**
 * The function that generate the map and loads the legends.
 * @param {object} mapData the JSON object that contains the paths and data of the map.
 */
function generateDep(mapData){

	//Definition of the SVG dimensions
	var width = window.innerWidth;
	var height = window.innerHeight;

	//Creation of the SVG element
	var svg = d3.select("#department")
		.html('')
		.append('svg')
		.attr("width", width)
		.attr("height", height);

	// Place le centre de la map
	var center = d3.geoCentroid(map);

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

	// Create the legends' title buttons elements
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
		lButton.onclick = (e) => selectLegende(e.target.getAttribute('lbl-legende-id'));
		document.getElementById('department').appendChild(lButton);
	}

}
/**
 * Function that returns the color used to fill the regions
 * @param {object} d		the data object from the map.
 * @param {number} codeDep	the department code.
 */
function setColor(d, codeDep){
	let code = d.properties.code;
	return (code == codeDep) ? '#88cbce' : '#224255';

}

/**
 * Function that handle the hover event of the circles.
 * @param {object} t		the hovered element.
 */
function hoverDot(t){
	d3.select(t)
		.transition().duration(350)
		.attr("r", 20)
		.style('cursor','pointer')
		.style("fill-opacity", 0.6);
	loadLegendNarration(parseInt(t.getAttribute('lbl-legende-id')));
}

/**
 * Function that handle the leave event of the circles.
 * @param {object} t		the hovered element.
 */
function leaveDot(t){
	d3.select(t)
		.transition().duration(350)
		.attr("r", 14)
		.style('cursor','initial')
		.style("fill-opacity", 0.5);
	legendNarration.animation.intervals.timeout = setInterval(hideLegendNarration, 3000);
}

/**
 * Function that extract the region id from the URL.
 * @param {string} url		the url of the current page.
 */
function getCodeDepartement(url){
	//return parseInt(url.split('/')[5]);
	return parseInt(document.querySelector('#content').dataset.department);
}

/**
 * Function that extract the type id from the URL.
 * @param {string} url		the url of the current page.
 */
function getCodeType(url){
	//return parseInt(url.split('/')[6]);
	return parseInt(document.querySelector('#content').dataset.personnage);
}

/**
 * Function that extract the svg paths of the selected region.
 * @param {number} code 	the id of the selected region.
 */
function getMapDepartement(code){
	let f = null;
	for(let i in mapFusion.features){
		let feature = mapFusion.features[i];
		if(feature.properties.code === code){
			f = feature;
			break;
		}
	}
	return f;
}

/**
 * Function that handle the selection of a legend.
 * @param {number} idLegende the id of the selected legend.
 */
function selectLegende(idLegende){
	if(idLegende > 0) loadRessources('legende', {
		legende: idLegende
	}, 1);
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
 * Fonction that display a text char by char.
 * @param {object} narrator 	the object that defines a config for narration.
 */
function narrate(narrator) {
	narrator.html.text.innerHTML += narrator.animation.text[narrator.animation.index];
	narrator.animation.index++;
	if(narrator.animation.text.length === narrator.animation.index) stopNarration(narrator);
}

/**
 * Return the category with the id 'type'.
 * @param {number} type 	the id of the wanted type.
 */
function getCategorie(type) {
	for(let c of categories) {
		if(c.id === parseInt(type, 10)) return c;
	}
}

/**
 * Return the legend with the id 'id'.
 * @param {number} id 	the id of the wanted legende.
 */
function getLegende(id) {
	for(let l of legendes) {
		if(l.id === id) return l;
	}
}

/**
 * Initialise the view of the narration
 */
function setNarrationBoxes() {
	let nbRows = baseNarration.animation.text.length / (baseNarration.html.box.offsetWidth / (fontSize*0.6)) + 1;
	baseNarration.properties.boxHeight = fontSize * 1.65 * nbRows + padding * 2;
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
	let nbRows = (legende.resume.length + legende.nom.length) / (legendNarration.html.box.offsetWidth / (fontSize*0.6)) + 2;
	legendNarration.html.box.style.height = `${fontSize * 1.65 * nbRows + padding * 2}px`;
	legendNarration.html.box.style.top = `-${fontSize * 1.65 * nbRows + padding * 2 + baseNarration.properties.boxHeight + window.innerHeight*0.07}px`;
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
 * The main function in ASYNC.
 */
(async () => {
	await getLegendes(codeDep, codeType, r => legendes = r);
	//await getTypesId(r => categories = r);
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
