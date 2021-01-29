'use strict'

/**
 * The file used to load the map with all the regions.
 */

/**
 * Constants definition
 */
//Colors
const validDepColor = '#88cbce';
const invalidDepColor = '#224255';
const hoveredValidDepColor = '#73b7ba';
const strokeColor = 'black';
const fontColor = 'white';

//Opacities
const validDepOpacity = '1';
const invalidDepOpacity = '0.9';

//Fonts
const fontSize = 24;

//Strokes
const strokeWidth = '1px';
const hoveredStrokeWidth = '2px';

/**
 * Variables definition
 */
let deps = {data: null, isValid: (code) => {
	for(let d of deps.data) if(d.id === code) return true;
	return false;
}};

/**
 * The function that loads the map.
 * @param {object} mapFusion the JSON object that contains the paths and data of the map.
 */
function generateMap(mapFusion){

	//Definition of the SVG dimensions
	const width = window.innerWidth-5;
	const height = window.innerHeight-5;


	//Creation of the SVG element
	var svg = d3.select('#bretagne')
		.html('')
		.append('svg')
		.attr('width', width)
		.attr('height', height);

	// Place le centre de la map
	var center = d3.geoCentroid((() => {
		let useful = JSON.parse(JSON.stringify(mapFusion));
		for(let i = 0; i < useful.features.length ; i++) {
			let f = useful.features[i];
			if(!deps.isValid(f.properties.code)) {
				useful.features.splice(i,1);
				i--;
			}
		}
		return {type: 'FeatureCollection', features: useful.features};
	})());

	// Projection des longitudes et latitudes
	var projection = d3.geoMercator()
		.center(center)
		.scale(width*11)
		.translate([ width /2, height/2 ])

	var path = d3.geoPath().projection(projection);


	// Dessine la map
	svg.append('g')
		.selectAll('path')
		.data(mapFusion.features)
		.enter()
		.append('path')
			.attr('id',function(d) { return 'path_' + d.properties.code})
			.attr('fill', function(d){return setColor(d);})
			.attr('fill-opacity', function(d){return setOpacity(d);})
			.attr('d', path)
			.on('mouseover', function(d){ hover(d.properties.code,this);})
			.on('mouseleave', function(d){ leave(d.properties.code,this);})
			.on('click', function(d){ selectDepartment(d.properties.code);})
			.style('stroke',strokeColor)
			.style('stroke-width', strokeWidth);

	// Place les noms des departements
	svg.append('g')
		.selectAll('labels')
		.data(mapFusion.features)
		.enter()
		.append('text')
			.attr('id', function(d) { return 'text_' + d.properties.code})
			.attr('x', function(d){return path.centroid(d)[0]})
			.attr('y', function(d){return path.centroid(d)[1]})
			.text(function(d){ return d.properties.nom})
			.attr('text-anchor', 'middle')
			.attr('alignment-baseline', 'central')
			.on('mouseover', function(d){
				let codeDep = d.properties.code;
				console.log(codeDep);
				let path = document.getElementById('path_' + codeDep);
				hover(codeDep,path);
			})
			.on('mouseleave', function(d){
				let codeDep = d.properties.code;
				let path = document.getElementById('path_' + codeDep);
				leave(codeDep,path);
			})
			.on('click', function(d){
				let codeDep = d.properties.code;
				selectDepartment(codeDep);})
			.style('cursor','pointer')
			.style('font-size', fontSize)
			.style('fill', fontColor)
			.style('display','none');

}

/**
 * Function that returns a color
 * @param {object} d the data object from the map.
 */
function setColor(d){
	let codeDep = d.properties.code;
	return (deps.isValid(codeDep)) ? validDepColor : invalidDepColor;
}

/**
 * Function that returns the opacity value
 * @param {object} d the data object from the map.
 */
function setOpacity(d){
	let codeDep = d.properties.code;
	return (deps.isValid(codeDep)) ? validDepOpacity : invalidDepOpacity;
}

/**
 * Function that handle the hover event of the regions.
 * @param {number} codeDep	the department code.
 * @param {object} t		the hovered element.
 */
function hover(codeDep,t){
	if(deps.isValid(codeDep)){
		d3.select(t)
		.transition().duration(500)
		.style('fill-opacity', 0.95)
		.style('stroke-width', hoveredStrokeWidth)
		.style('fill', hoveredValidDepColor)
		.style('cursor','pointer');
		d3.select('#text_' + codeDep).style("display", 'initial');
	}
}

/**
 * Function that handle the leave event of the regions.
 * @param {number} codeDep	the department code.
 * @param {object} t		the leaved element.
 */
function leave(codeDep,t){
	if(deps.isValid(codeDep)){
		d3.select(t)
		.transition().duration(500)
		.style('fill-opacity', 1)
		.style('stroke-width', strokeWidth)
		.style("fill", validDepColor)
  		.style('cursor','initial');
		d3.select('#text_' + codeDep).style("display", 'none');
	}
}

/**
 * Function that handle the selection of a region
 * @param {number} codeDep	the department code.
 */
function selectDepartment(codeDep){
	let id = getID(codeDep);
	if(id > 0) document.location.href= ROOT + 'personnages/' + id;
}

/**
 * Function that return the ID of a region from it's code.
 * @param {number} code 	the department code.
 */
function getID(code){
	return deps.isValid(code) ? code : -1;
}

/**
 * The main function in ASYNC.
 */
(async () => {
	await getRegionsId(r => deps.data = r);
	generateMap(mapFusion);
})();

/**
 * When the window is resized, we reload the map.
 */
window.addEventListener("resize", function(e) {
	generateMap(mapFusion);
});
