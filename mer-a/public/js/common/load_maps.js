'use strict';

/**
 * Function that returns the color used to fill the regions
 * @param {object} d the data object from the map.
 */
function setColor(d){
	let codeDep = d.properties.code;
	return (deps.isValid(codeDep)) ? validDepColor : invalidDepColor;
}

/**
 * Functionthat returns the color used to paint the stroke of the regions
 * @param {object} d the data object from the map.
 */
function setStrokeOpacity(d){
	let codeDep = d.properties.code;
	return (deps.isValid(codeDep)) ? validStrokeOpacity : invalidStrokeOpacity;
}

function setStrokeWidth(d){
	let codeDep = d.properties.code;
	return (deps.isValid(codeDep)) ? validStrokeWidth : invalidStrokeWidth;
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
 * =============================
 * 
 *           HANDLERS
 * 
 * =============================
 */

/**
 * ====================================
 * 
 *           PAGE CHOIX DEP
 * 
 * ====================================
 */

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
		.style('stroke-width', validStrokeWidth)
		.style("fill", validDepColor)
  		.style('cursor','initial');
		d3.select('#text_' + codeDep).style("display", 'none');
	}
}

/**
 * ======================================
 * 
 *           PAGE CHOIX LEGENDE
 * 
 * ======================================
 */

/**
 * Function that handle the hover event of the circles.
 * @param {object} t		the hovered element.
 */
function hoverDot(t){
	d3.select(t)
		.transition().duration(350)
		.attr("r", circlesSizeHovered)
		.style('cursor','pointer')
		.style("fill-opacity", circlesHoveredOpacity);
	loadLegendNarration(parseInt(t.getAttribute('lbl-legende-id')));
}

/**
 * Function that handle the leave event of the circles.
 * @param {object} t		the hovered element.
 */
function leaveDot(t){
	d3.select(t)
		.transition().duration(350)
		.attr("r", circlesSize)
		.style('cursor','initial')
		.style("fill-opacity", circlesOpacity);
	legendNarration.animation.intervals.timeout = setInterval(hideLegendNarration, 3000);
}

/**
 * ======================================
 * 
 *           CHARGEMENT MAPS
 * 
 * ======================================
 */

/**
 * ======================================
 * 
 *           PAGE CHOIX LEGENDE
 * 
 * ======================================
 */

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
			.attr("fill", function(d){return setColor(d);})
			.attr("d", path)
			.style('stroke',strokeColor)
			.style('stroke-opacity',function(d){return setStrokeOpacity(d);})
			.style('stroke-width', function(d){return setStrokeWidth(d);});;

	// Dessine les points des différents lieux à visiter
	svg.selectAll("myCircles")
		.data(legendes)
		.enter()
		.append("circle")
			.attr("id", function(d){ return 'dot_legende_' + d.id; })
			.attr("lbl-legende-id", function(d){ return d.id; })
			.attr("cx", function(d){ return projection([d.longitude, d.latitude])[0]; })
			.attr("cy", function(d){ return projection([d.longitude, d.latitude])[1]; })
			.attr("r", circlesSize)
			.style("fill", circlesColor)
			.attr("stroke", circlesColor)
			.attr("stroke-width", circlesStrokeWidth)
			.attr("fill-opacity", circlesOpacity)
			.on('mouseover', function(d){
				hoverDot(this);
				document.getElementById('label_legende_' + this.getAttribute('lbl-legende-id')).style.display = 'block';
			})
			.on('mouseleave', function(d){
				leaveDot(this);
				document.getElementById('label_legende_' + this.getAttribute('lbl-legende-id')).style.display = 'none';
			})
			.on('click', d => selectLegende(parseInt(d.id)));

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
		lButton.onclick = (e) => selectLegende(parseInt(e.target.getAttribute('lbl-legende-id')));
		document.getElementById('department').appendChild(lButton);
	}

}

/**
 * ====================================
 * 
 *           PAGE CHOIX DEP
 * 
 * ====================================
 */

function hoverDot(t){
	d3.select(t)
		.transition().duration(350)
		.attr("r", circlesSizeHovered)
		.style('cursor','pointer')
		.style("fill-opacity", circlesHoveredOpacity);
	loadLegendNarration(parseInt(t.getAttribute('lbl-legende-id')));
}

/**
 * Function that handle the leave event of the circles.
 * @param {object} t		the hovered element.
 */
function leaveDot(t){
	d3.select(t)
		.transition().duration(350)
		.attr("r", circlesSize)
		.style('cursor','initial')
		.style("fill-opacity", circlesOpacity);
	legendNarration.animation.intervals.timeout = setInterval(hideLegendNarration, 3000);
}

/**
 * Function that extract the svg paths of the selected region.
 * @param {number} code 	the id of the selected region.
 */
function getMapDepartement(){
	return mapFusion.features.find(element => element.properties.code === router.data.department);
}

/**
 * The function that loads the map.
 * @param {object} mapFusion the JSON object that contains the paths and data of the map.
 */
function generateMap(mapFusion){

	//Definition of the SVG dimensions
	const width = window.innerWidth;
	const height = window.innerHeight;

	//Creation of the SVG element
	var svg = d3.select('#bretagne')
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
			.attr('d', path)
			.on('mouseover', function(d){ hover(d.properties.code,this);})
			.on('mouseleave', function(d){ leave(d.properties.code,this);})
			.on('click', function(d){ selectDepartment(d.properties.code);})
			.style('stroke',strokeColor)
			.style('stroke-opacity',function(d){return setStrokeOpacity(d);})
			.style('stroke-width', function(d){return setStrokeWidth(d);});

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
			.style('font-size', mapFontSize)
			.style('fill', fontColor)
			.style('display','none');
}

/**
 * Function that returns the color used to fill the regions
 * @param {object} d the data object from the map.
 */
function setColor(d){
	let codeDep = d.properties.code;
	return (deps.isValid(codeDep)) ? validDepColor : invalidDepColor;
}

/**
 * Functionthat returns the color used to paint the stroke of the regions
 * @param {object} d the data object from the map.
 */
function setStrokeOpacity(d){
	let codeDep = d.properties.code;
	return (deps.isValid(codeDep)) ? validStrokeOpacity : invalidStrokeOpacity;
}

function setStrokeWidth(d){
	let codeDep = d.properties.code;
	return (deps.isValid(codeDep)) ? validStrokeWidth : invalidStrokeWidth;
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
		.style('stroke-width', validStrokeWidth)
		.style("fill", validDepColor)
  		.style('cursor','initial');
		d3.select('#text_' + codeDep).style("display", 'none');
	}
}