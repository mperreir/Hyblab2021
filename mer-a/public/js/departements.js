'use strict';

/**
 * The main function in ASYNC.
 */
(async () => {
	let validRegions = null;
	await getRegionsId(r => validRegions = r);
	let map = new Map(router.externData.map, '#bretagne', validRegions,
	() => {
		return d3.geoCentroid((() => {
			let useful = router.externData.map.features.filter(feature => map.isValid(feature.properties.code));
			return {type: 'FeatureCollection', features: useful};
		})());
	},
	11,
	[
		{name: 'mouseover', handler: d => {hover(d.properties.code,$(`#path_${d.properties.code}`)[0], map)}},
		{name: 'mouseleave', handler: d => leave(d.properties.code,$(`#path_${d.properties.code}`)[0], map)},
		{name: 'click', handler: d => selectDepartment(d.properties.code, map)}
	],
	(svg, path, _) => {
		svg.append('g')
			.selectAll('labels')
			.data(router.externData.map.features)
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
					hover(codeDep, path, map);
				})
				.on('mouseleave', function(d){
					let codeDep = d.properties.code;
					let path = document.getElementById('path_' + codeDep);
					leave(codeDep, path, map);
				})
				.on('click', function(d){
					let codeDep = d.properties.code;
					selectDepartment(codeDep, map);})
				.style('cursor','pointer')
				.style('font-size', map.mapFontSize)
				.style('fill', map.fontColor)
				.style('display','none');
	});
	map.generateMap();
	/**
	* When the window is resized, we reload the map.
	*/
	window.onresize = () => {
		map.generateMap();
	};
})();
