'use strict';

class Map {

	//Colors
	validDepColor = '#88cbce';
	invalidDepColor = '#224255';
	hoveredValidDepColor = '#73b7ba';
	strokeColor = 'black';
	invalidStrokeColor = 'none';
	fontColor = 'white';

	//Opacity
	validStrokeOpacity = 1;
	invalidStrokeOpacity = 0.1;

	//Strokes
	validStrokeWidth = '2px';
	invalidStrokeWidth = '10px';
	hoveredStrokeWidth = '3px';

	circlesSize = 14;
	circlesSizeHovered = 20;

	//Colors
	circlesColor = 'white';

	//Opacity
	circlesOpacity = 1;
	circlesHoveredOpacity = 0.6;

	//Strokes
	circlesStrokeWidth = '3px';

	mapFontSize = 24;

	constructor(featureCollection, container, validRegions, geoCenter, scaling, baseEvents, otherComponents) {
		this.map = featureCollection;
		this.geoCenter = geoCenter;
		this.baseEvents = baseEvents;
		this.generateOtherComponents = otherComponents;
		this.containerSelector = container;
		this.validRegions = validRegions;
		this.scale = scaling;
	}

	generateMap() {

		const currentMap = this;

		//Definition of the SVG dimensions
		const width = window.innerWidth;
		const height = window.innerHeight;

		//Creation of the SVG element
		var svg = d3.select(this.containerSelector)
			.html('')
			.append('svg')
			.attr('width', width)
			.attr('height', height);

		// Projection des longitudes et latitudes
		var projection = d3.geoMercator()
			.center(this.geoCenter())
			.scale(width*this.scale)
			.translate([ width /2, height/2 ])

		var path = d3.geoPath().projection(projection);

		// Dessine la map
		svg.append('g')
			.selectAll('path')
			.data(this.map.features)
			.enter()
			.append('path')
				.attr('id',function(d) {return 'path_' + d.properties.code})
				.attr('fill', function(d){return currentMap.setColor(d);})
				.attr('d', path)
				.style('stroke',this.strokeColor)
				.style('stroke-opacity',function(d){return currentMap.setStrokeOpacity(d);})
				.style('stroke-width', function(d){return currentMap.setStrokeWidth(d);});

		if(this.baseEvents) this.baseEvents.forEach((event) => {
			console.log(event);
			svg.selectAll('path').on(event.name, event.handler);
		});

		this.generateOtherComponents(svg, path, projection);
	}

	/**
	 * Function that returns the color used to fill the regions
	 * @param {object} d the data object from the map.
	 */
	setColor(d){
		let codeDep = d.properties.code;
		return (this.isValid(codeDep)) ? this.validDepColor : this.invalidDepColor;
	}

	/**
	 * Function that returns the color used to paint the stroke of the regions
	 * @param {object} d the data object from the map.
	 */
	setStrokeOpacity(d){
		let codeDep = d.properties.code;
		return (this.isValid(codeDep)) ? this.validStrokeOpacity : this.invalidStrokeOpacity;
	}

	setStrokeWidth(d){
		let codeDep = d.properties.code;
		return (this.isValid(codeDep)) ? this.validStrokeWidth : this.invalidStrokeWidth;
	}

	isValid(code) {
		if(this.validRegions !== null) return ((this.validRegions.find(data => data.id === code)) !== undefined) ? true : false;
	}

	/**
	 * Function that return the ID of a region from it's code.
	 * @param {number} code 	the department code.
	 */
	getID(code){
		return this.isValid(code) ? code : -1;
	}

	getMapDepartement(code){
		return this.map.features.find(element => element.properties.code === code);
	}


}

/**
 * =============================
 *           HANDLERS
 * =============================
 */

/**
 * ====================================
 *           PAGE CHOIX DEP
 * ====================================
 */

/**
 * Function that handle the hover event of the regions.
 * @param {number} codeDep	the department code.
 * @param {object} t		the hovered element.
 */
function hover(codeDep, t, map){
	if(map.isValid(codeDep)){
		d3.select(t)
		.transition().duration(500)
		.style('fill-opacity', 0.95)
		.style('stroke-width', map.hoveredStrokeWidth)
		.style('fill', map.hoveredValidDepColor)
		.style('cursor','pointer');
		d3.select('#text_' + codeDep).style("display", 'initial');
	}
}

/**
 * Function that handle the leave event of the regions.
 * @param {number} codeDep	the department code.
 * @param {object} t		the leaved element.
 */
function leave(codeDep, t, map){
	if(map.isValid(codeDep)){
		d3.select(t)
		.transition().duration(500)
		.style('fill-opacity', 1)
		.style('stroke-width', map.validStrokeWidth)
		.style("fill", map.validDepColor)
  		.style('cursor','initial');
		d3.select('#text_' + codeDep).style("display", 'none');
	}
}

/**
 * ======================================
 *           PAGE CHOIX LEGENDE
 * ======================================
 */

/**
 * Function that handle the hover event of the circles.
 * @param {object} t		the hovered element.
 */
function hoverDot(t, narrator, map){
	d3.select(t)
		.transition().duration(350)
		.attr("r", map.circlesSizeHovered)
		.style('cursor','pointer')
		.style("fill-opacity", map.circlesHoveredOpacity);
	loadLegendNarration(narrator, parseInt(t.getAttribute('lbl-legende-id')));
}

/**
 * Function that handle the leave event of the circles.
 * @param {object} t		the hovered element.
 */
function leaveDot(t, narrator, map){
	d3.select(t)
		.transition().duration(350)
		.attr("r", map.circlesSize)
		.style('cursor','initial')
		.style("fill-opacity", map.circlesOpacity);
	//legendNarrator.animation.intervals.custom.timeout = setInterval(legendNarrator.hide, 3000, legendNarrator);
	narrator.animation.intervals.custom.timeout = setInterval(loadBaseTextNarration, 2000, narrator);
}

/**
 * ======================================
 *           CHARGEMENT MAPS
 * ======================================
 */

/**
 * ======================================
 *           PAGE CHOIX LEGENDE
 * ======================================
 */

/**
 * The function that generate the map and loads the legends.
 * @param {object} mapData the JSON object that contains the paths and data of the map.
 */
// function generateDep(mapData, narrator){

// 	//Definition of the SVG dimensions
// 	const width = window.innerWidth;
// 	const height = window.innerHeight;

// 	//Creation of the SVG element
// 	var svg = d3.select("#department")
// 		.html('')
// 		.append('svg')
// 		.attr("width", width)
// 		.attr("height", height);

// 	// Place le centre de la map
	// var center = d3.geoCentroid(map);
	// var seaBorder = d3.geoBounds(map);
	// switch(deps.get(router.data.department).frontiereMer) {
	// 	case 'top':
	// 		center = [center[0], seaBorder[1][1]];
	// 		break;
	// 	case 'right':
	// 		seaBorder = [seaBorder[1][0], center[1]];
	// 		break;
	// 	case 'bottom':
	// 		seaBorder = [center[0], seaBorder[0][1]];
	// 		break;
	// 	case 'left':
	// 		seaBorder = [seaBorder[0][0], center[1]];
	// 		break;
	// }

// 	// Projection des longitudes et latitudes
// 	var projection = d3.geoMercator()
// 		.center(center)
// 		.scale(width*16)
// 		.translate([ width /2, height/2 ]);

// 	var path = d3.geoPath().projection(projection);

// 	// Dessine la map
// 	svg.append("g")
// 		.selectAll("path")
// 		.data(mapData.features)
// 		.enter()
// 		.append("path")
// 			.attr('id',function(d) { return 'path_' + d.properties.code})
// 			.attr("fill", function(d){return setColor(d);})
// 			.attr("d", path)
// 			.style('stroke',strokeColor)
// 			.style('stroke-opacity',function(d){return setStrokeOpacity(d);})
// 			.style('stroke-width', function(d){return setStrokeWidth(d);});;

	// // Dessine les points des différents lieux à visiter
	// svg.selectAll("myCircles")
	// 	.data(legendes)
	// 	.enter()
	// 	.append("circle")
	// 		.attr("id", function(d){ return 'dot_legende_' + d.id; })
	// 		.attr("lbl-legende-id", function(d){ return d.id; })
	// 		.attr("cx", function(d){ return projection([d.longitude, d.latitude])[0]; })
	// 		.attr("cy", function(d){ return projection([d.longitude, d.latitude])[1]; })
	// 		.attr("r", circlesSize)
	// 		.style("fill", circlesColor)
	// 		.attr("stroke", circlesColor)
	// 		.attr("stroke-width", circlesStrokeWidth)
	// 		.attr("fill-opacity", circlesOpacity)
	// 		.on('mouseover', function(d){
	// 			hoverDot(this, narrator);
	// 			document.getElementById('label_legende_' + this.getAttribute('lbl-legende-id')).style.display = 'block';
	// 		})
	// 		.on('mouseleave', function(d){
	// 			leaveDot(this, narrator);
	// 			document.getElementById('label_legende_' + this.getAttribute('lbl-legende-id')).style.display = 'none';
	// 		})
	// 		.on('click', d => selectLegende(parseInt(d.id)));

	// // Create the legends' title buttons elements
	// for(let l of legendes) {
	// 	let lButton = document.createElement('a');
	// 	lButton.id = 'label_legende_' + l.id;
	// 	lButton.setAttribute('lbl-legende-id', l.id);
	// 	lButton.classList.add('legend_button'),
	// 	lButton.style.left = projection([l.longitude, l.latitude])[0] + 'px';
	// 	lButton.style.top = (projection([l.longitude, l.latitude])[1]-100) + 'px';
	// 	lButton.innerHTML = l.nom;
	// 	lButton.onmouseover = (e) => {
	// 		e.target.style.display = 'block';
	// 		hoverDot(document.getElementById('dot_legende_' + e.target.getAttribute('lbl-legende-id')));
	// 	}
	// 	lButton.onmouseleave = (e) => {
	// 		e.target.style.display = 'none';
	// 		leaveDot(document.getElementById('dot_legende_' + e.target.getAttribute('lbl-legende-id')));
	// 	}
	// 	lButton.onclick = (e) => selectLegende(parseInt(e.target.getAttribute('lbl-legende-id')));
	// 	document.getElementById('department').appendChild(lButton);
	// }

// }

/**
 * ====================================
 *           PAGE CHOIX DEP
 * ====================================
 */

/**
 * The function that loads the map.
 * @param {object} mapFusion the JSON object that contains the paths and data of the map.
 */
// function generateMap(mapFusion){

// 	//Definition of the SVG dimensions
// 	const width = window.innerWidth;
// 	const height = window.innerHeight;

// 	//Creation of the SVG element
// 	var svg = d3.select('#bretagne')
// 		.html('')
// 		.append('svg')
// 		.attr('width', width)
// 		.attr('height', height);

// 	// Place le centre de la map
	// var center = d3.geoCentroid((() => {
	// 	let useful = mapFusion.features.filter(feature => deps.isValid(feature.properties.code));
	// 	return {type: 'FeatureCollection', features: useful};
	// })());

// 	// Projection des longitudes et latitudes
// 	var projection = d3.geoMercator()
// 		.center(center)
// 		.scale(width*11)
// 		.translate([ width /2, height/2 ])

// 	var path = d3.geoPath().projection(projection);


// 	// Dessine la map
// 	svg.append('g')
// 		.selectAll('path')
// 		.data(mapFusion.features)
// 		.enter()
// 		.append('path')
// 			.attr('id',function(d) { return 'path_' + d.properties.code})
// 			.attr('fill', function(d){return setColor(d);})
// 			.attr('d', path)
// 			.style('stroke',strokeColor)
// 			.style('stroke-opacity',function(d){return setStrokeOpacity(d);})
// 			.style('stroke-width', function(d){return setStrokeWidth(d);});
// 	svg.selectAll('path')
// 	.on('mouseover', function(d){ hover(d.properties.code,this);})
// 	.on('mouseleave', function(d){ leave(d.properties.code,this);})
// 	.on('click', function(d){ selectDepartment(d.properties.code);})

// 	// Place les noms des departements
	// svg.append('g')
	// 	.selectAll('labels')
	// 	.data(mapFusion.features)
	// 	.enter()
	// 	.append('text')
	// 		.attr('id', function(d) { return 'text_' + d.properties.code})
	// 		.attr('x', function(d){return path.centroid(d)[0]})
	// 		.attr('y', function(d){return path.centroid(d)[1]})
	// 		.text(function(d){ return d.properties.nom})
	// 		.attr('text-anchor', 'middle')
	// 		.attr('alignment-baseline', 'central')
	// 		.on('mouseover', function(d){
	// 			let codeDep = d.properties.code;
	// 			let path = document.getElementById('path_' + codeDep);
	// 			hover(codeDep,path);
	// 		})
	// 		.on('mouseleave', function(d){
	// 			let codeDep = d.properties.code;
	// 			let path = document.getElementById('path_' + codeDep);
	// 			leave(codeDep,path);
	// 		})
	// 		.on('click', function(d){
	// 			let codeDep = d.properties.code;
	// 			selectDepartment(codeDep);})
	// 		.style('cursor','pointer')
	// 		.style('font-size', mapFontSize)
	// 		.style('fill', fontColor)
	// 		.style('display','none');
// }
