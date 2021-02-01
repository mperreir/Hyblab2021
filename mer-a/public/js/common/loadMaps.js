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