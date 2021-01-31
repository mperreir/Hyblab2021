'use strict';

/**
 * The main function in ASYNC.
 */
(async () => {
	let validRegions = null;
	await getRegionsId(r => validRegions = r);
	departements = validRegions;
	let map = new Map(mapFusion, '#bretagne', validRegions,
	() => {
		return d3.geoCentroid((() => {
			let useful = mapFusion.features.filter(feature => map.isValid(feature.properties.code));
			return {type: 'FeatureCollection', features: useful};
		})());
	},
	[
		{name: 'mouseover', handler: d => {hover(d.properties.code,$(`#path_${d.properties.code}`)[0], map)}},
		{name: 'mouseleave', handler: d => leave(d.properties.code,$(`#path_${d.properties.code}`)[0], map)},
		{name: 'click', handler: d => selectDepartment(d.properties.code, map)}
	],
	(svg, path) => {
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
				.style('font-size', map.mapFontSize)
				.style('fill', map.fontColor)
				.style('display','none');
	});
	map.generateMap();
	/**
	* When the window is resized, we reload the map.
	*/
	window.addEventListener("resize", function(e) {
		map.generateMap();
	});
})();
