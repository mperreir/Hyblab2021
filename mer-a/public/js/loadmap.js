'use strict'

function generateMap(mapData, mapFusion){

	var width = window.innerWidth-5;
	var height = window.innerHeight-5;

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
			.attr('fill', function(d){return color(d);})
			.attr('d', path)
			.on('mouseover', function(d){ hover(d.properties.code,this);})
			.on('mouseleave', function(d){ leave(d.properties.code,this);})
			.on('click', function(d){ selectDepartment(d.properties.code);})
			.style('stroke','black')
			.style('stroke-width', '1px');

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
			.style('font-size', 28)
			.style('fill', 'white')
			.style('display','none');

}

function color(d){
	let codeDep = d.properties.code;	
	if(deps.isValid(codeDep)) return '#88cbce';
	else return 'white';
}

function hover(codeDep,t){

	if(deps.isValid(codeDep)){

		d3.select(t)
		.transition().duration(500)
		.style('fill-opacity', 0.95)
		.style('stroke-width', '2px')
		.style('fill', '#73b7ba')
		.style('cursor','pointer');
		d3.select('#text_' + codeDep).style('display', 'initial');
	}
}

function leave(codeDep,t){
	
	if(deps.isValid(codeDep)){

		d3.select(t)
		.transition().duration(500)
		.style('fill-opacity', 1)
		.style('stroke-width', '1px')
		.style('fill', '#88cbce')
		.style('cursor','initial');
		d3.select('#text_' + codeDep).style('display', 'none');

	}
}

function selectDepartment(codeDep){
	let id = getID(codeDep);
	if(id > 0) document.location.href= ROOT + 'personnages/' + id; 
}

function getID(code){
	if(deps.isValid(code)) return code;
	else return -1;
}

let deps = {data: null, isValid: (code) => {
	for(let d of deps.data) if(d.id === code) return true;
	return false;
}};
(async () => {
	await getRegionsId(r => deps.data = r);
	generateMap(labs,mapFusion);
})();

window.addEventListener('resize', function(e) { 
	generateMap(labs,mapFusion);
});

