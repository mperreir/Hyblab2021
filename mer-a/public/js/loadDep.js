'use strict'


const url = window.location.href;
const codeDep = getCodeDepartement(url);
const codeType = getCodeType(url);
const map = getMapDepartement(codeDep);
const persoBox = document.getElementById('character');
const narrationBox = document.getElementById('narration');
const narrationTextBox = document.querySelector('#narration > span');
const narrationPass = document.querySelector('#narration > button.pass_narration');
const legendNarrationBox = document.querySelector('#narration_legende');
const legendNarrationTextBox = document.querySelector('#narration_legende > span.resume');
const legendNarrationTitleBox = document.querySelector('#narration_legende > span.title');
const legendNarrationPass = document.querySelector('#narration_legende > button.pass_narration');
const fontSize = window.innerHeight*0.023;
const padding = window.innerHeight*0.008;
let perso = null;
let narration = null;
let narrationIndex = 0;
let legendIndex = 0;
let narrationInterval = null;
let legendInterval = null;
let legendTimeout = null;
let legendNarrationId = null;
let categories = null;
let categorie = null;
let legendes = null;
let narrationBoxHeight = 0;

function generateDep(depData, mapData, codeDep, codeType){

	var width = window.innerWidth;
	var height = window.innerHeight;

	var svg = d3.select("#department")
		.html('')
		.append('svg')
		.attr("width", width)
		.attr("height", height);

	// Place le centre de la map
	var center = d3.geoCentroid(depData);
	//console.log(depData);
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
			.attr("fill-opacity", function(d){return setOpacity(d, codeDep);})
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
				hoverLabel(document.getElementById('label_legende_' + this.getAttribute('lbl-legende-id')));
			})
			.on('mouseleave', function(d){
				leaveDot(this);
				leaveLabel(document.getElementById('label_legende_' + this.getAttribute('lbl-legende-id')));
			})
			.on('click', d => selectLegende(d.id));

	for(let l of legendes) {
		let lButtonLarge = document.createElement('div');
		let lButton = document.createElement('a');
		lButton.id = 'label_legende_' + l.id;
		lButton.setAttribute('lbl-legende-id', l.id);
		lButton.classList.add('legend_button'),
		lButton.style.left = projection([l.longitude, l.latitude])[0] + 'px';
		lButton.style.top = (projection([l.longitude, l.latitude])[1]-100) + 'px';
		lButton.innerHTML = l.nom;
		lButton.onmouseover = (e) => {
			hoverLabel(e.target);
			hoverDot(document.getElementById('dot_legende_' + e.target.getAttribute('lbl-legende-id')));
		}
		lButton.onmouseleave = (e) => {
			leaveLabel(e.target);
			leaveDot(document.getElementById('dot_legende_' + e.target.getAttribute('lbl-legende-id')));
		}
		document.getElementById('department').appendChild(lButton);
	}

	// svg.selectAll("labels")
	// 	.data(legendes)
	// 	.enter()
	// 	.append("text").append("tspan")
	// 		.attr("id", function(d){ return 'label_legende_' + d.id; })
	// 		.attr("lbl-legende-id", function(d){ return d.id; })
	// 		.attr("class", "legend_button")
	// 		.attr("x", function(d){ return projection([d.longitude, d.latitude])[0]; })
	// 		.attr("y", function(d){ return projection([d.longitude, d.latitude])[1] - 14 - 20; })
	// 		.text(function(d){ return d.nom})
	// 		.attr("text-anchor", "middle")
	// 		.attr("alignment-baseline", "central")
	// 		.style("fill", "white")
	// 		.style("display", "none")
	// 		.style("font-size", 14)
	// 		.style("font-weight", "bold")
	// 		.attr("fill-opacity", 1)
	// 		.on('mouseover', function(d){
	// 			hoverLabel(this);
	// 			hoverDot(document.getElementById('dot_legende_' + this.getAttribute('lbl-legende-id')));
	// 		})
	// 		.on('mouseleave', function(d){
	// 			leaveLabel(this);
	// 			leaveDot(document.getElementById('dot_legende_' + this.getAttribute('lbl-legende-id')));
	// 		})
	// 		.on('click', d => selectLegende(d.id));

}

function setColor(d, codeDep){
	let code = d.properties.code;
	return (code == codeDep) ? '#88cbce' : '#224255';

}

function setOpacity(d, codeDep){
	let code = d.properties.code;	
	return (code == codeDep) ? 1 : 0.9;
}
function hoverDot(t){
	d3.select(t)
		.transition().duration(350)
		.attr("r", 20)
		.style('cursor','pointer')
		.style("fill-opacity", 0.6);
	loadLegendNarration(parseInt(t.getAttribute('lbl-legende-id')));
	// TODO : faire apparaitre explication perso
}
function hoverLabel(t){
	t.style.display = 'block';
	// TODO : faire apparaitre explication perso
}

function leaveDot(t){
	d3.select(t)
		.transition().duration(350)
		.attr("r", 14)
		.style('cursor','initial')
		.style("fill-opacity", 0.5);
	legendTimeout = setInterval(hideLegendNarration, 3000);
	// TODO : faire disparaitre explication perso
}
function leaveLabel(t){
	t.style.display = 'none';
	// TODO : faire disparaitre explication perso
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

function loadNarration() {
	narrationTextBox.innerHTML += narration[narrationIndex];
	narrationIndex++;
	if(narration.length === narrationIndex) stopNarration();
}

function legendNarrate(legend) {
	legendNarrationTextBox.innerHTML += legend[legendIndex];
	legendIndex++;
	if(legend.length === legendIndex) stopLegendNarration(legend);
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

function setNarrationBox() {
	let nbRows = narration.length / (narrationBox.offsetWidth / (fontSize*0.6667)) + 1;
	narrationBoxHeight = fontSize * nbRows + padding * 2;
	narrationBox.style.height = `${narrationBoxHeight}px`;
	narrationBox.style.top = `-${narrationBoxHeight}px`;
	narrationPass.onclick = stopNarration;
	legendNarrationPass.onclick = stopLegendNarration;
	legendNarrationBox.style.display = 'none';
}

function loadLegendNarration(id) {
	resetLegendNarration();
	legendNarrationId = id;
	let legende = getLegende(id);
	legendNarrationBox.style.display = 'block';
	legendNarrationPass.style.display = 'block';
	let nbRows = (legende.resume.length + legende.nom.length) / (legendNarrationBox.offsetWidth / (fontSize*0.6667)) + 2;
	legendNarrationBox.style.height = `${fontSize * nbRows + padding * 2}px`;
	legendNarrationBox.style.top = `-${fontSize * nbRows + padding * 2 + narrationBoxHeight + window.innerHeight*0.07}px`;
	legendNarrationTitleBox.innerHTML = legende.nom;
	legendInterval = setInterval(legendNarrate, 45, legende.resume);
}

function resetLegendNarration() {
	clearInterval(legendInterval);
	clearInterval(legendTimeout);
	legendNarrationTextBox.innerHTML = '';
	legendIndex = 0;
}

function hideLegendNarration() {
	clearInterval(legendTimeout);
	legendNarrationBox.style.display = 'none';
	legendIndex = 0;
}

function stopNarration() {
	clearInterval(narrationInterval);
	narrationTextBox.innerHTML = narration;
	narrationPass.remove();
}
function stopLegendNarration(legend) {
	if(typeof(legend) !== "string") legend = getLegende(legendNarrationId).resume;
	clearInterval(legendInterval);
	legendNarrationTextBox.innerHTML = legend;
	legendNarrationPass.style.display = 'none';
}

(async () => {
	await getLegendes(codeDep, codeType, r => legendes = r);
	await getTypesId(r => categories = r);
	categorie = getCategorie(codeType);
	narration = categorie.phraseDep;
	setNarrationBox();
	generateDep(map,mapFusion,codeDep,codeType);
	loadCharacter();
	perso = document.getElementById('character_image');
	narrationInterval = setInterval(loadNarration, 45);
	setTimeout(() => perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`,500);
})();

window.addEventListener("resize", function(e) {
	perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`;
	setNarrationBox();
	generateDep(map,mapFusion,codeDep,codeType);
});
