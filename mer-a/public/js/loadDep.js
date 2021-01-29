'use strict'


const url = window.location.href;
const codeDep = getCodeDepartement(url);
const codeType = getCodeType(url);
const map = getMapDepartement(codeDep);
const persoBox = document.getElementById('character');
const narrationBox = document.getElementById('narration');
const narrationTextBox = document.querySelector('#narration > span');
const narrationPass = document.getElementById('pass_narration');
const fontSize = window.innerHeight*0.017;
const padding = window.innerHeight*0.008;
let perso = null;
let narration = null;
let narrationIndex = 0;
let narrationInterval = null;
let categories = null;
let categorie = null;
let legendes = null;

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
			.attr("d", path)
			.style('stroke','black')
			.style('stroke-width', '1px');

	// Dessine les points des différents lieux à visiter
	svg.selectAll("myCircles")
		.data(legendes)
		.enter()
		.append("circle")
			.attr("id", function(d){ return 'dot_legende_' + d.id; })
			.attr("cx", function(d){ return projection([d.longitude, d.latitude])[0]; })
			.attr("cy", function(d){ return projection([d.longitude, d.latitude])[1]; })
			.attr("r", 14)
			.style("fill", "white")
			.attr("stroke", "white")
			.attr("stroke-width", 3)
			.attr("fill-opacity", .5)
			.on('mouseover', function(d){
				hover(d,this);
			})
			.on('mouseleave', function(d){
				leave(d, this);
			})
			.on('click', d => selectLegende(d.id));

	svg.selectAll("labels")
		.data(legendes)
		.enter()
		.append("text")
			.attr("id", function(d){ return 'label_legende_' + d.id; })
			.attr("lbl-legende-id", function(d){ return d.id; })
			.attr("x", function(d){ return projection([d.longitude, d.latitude])[0]; })
			.attr("y", function(d){ return projection([d.longitude, d.latitude])[1] - 14 - 20; })
			.text(function(d){ return d.nom})
			.attr("text-anchor", "middle")
			.attr("alignment-baseline", "central")
			.style("fill", "white")
			.style("font-size", 14)
			.style("font-weight", "bold")
			.attr("fill-opacity", 1)
			.on('mouseover', function(d){
				d3.select(this)
					.transition().duration(350)
					.style("font-size", 20);
				hover(null,document.getElementById('dot_legende_' + this.getAttribute('lbl-legende-id')));
			})
			.on('mouseleave', function(d){
				d3.select(this)
					.transition().duration(350)
					.style("font-size", 14);
				leave(null,document.getElementById('dot_legende_' + this.getAttribute('lbl-legende-id')));
			})
			.on('click', d => selectLegende(d.id));

}

function setColor(d, codeDep){
	let code = d.properties.code;
	return (code == codeDep) ? '#88cbce' : '#224255';

}

function hover(d,t){
	d3.select(t)
		.transition().duration(350)
		.attr("r", 20)
		.style("fill-opacity", 0.6);
	// TODO : faire apparaitre explication perso
}

function leave(d,t){
	d3.select(t)
		.transition().duration(350)
		.attr("r", 14)
		.style("fill-opacity", 0.5);
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

function getCategorie(type) {
	for(let c of categories) {
		if(c.id === type) return c;
	}
}

function setNarrationBox() {
	let nbRows = narration.length / (narrationBox.offsetWidth / (fontSize*0.6667)) + 1;
	narrationBox.style.height = `${fontSize * nbRows + padding * 2}px`;
	narrationPass.onclick = stopNarration;
}

function stopNarration() {
	console.log('test');
	clearInterval(narrationInterval);
	narrationTextBox.innerHTML = narration;
	narrationPass.remove();
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
	setTimeout(() => perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`,100);
})();

window.addEventListener("resize", function(e) {
	perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`;
	setNarrationBox();
	generateDep(map,mapFusion,codeDep,codeType);
});
