'use strict'

function generateDep(depData, mapData, codeDep, codeLegende){

	var width = window.innerWidth;
	var height = window.innerHeight;

	var svg = d3.select("#department")
		.html('')
		.append('svg')
		.attr("width", width)
		.attr("height", height);

	// Place le centre de la map
	var center = d3.geoCentroid(depData);

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
			.attr("fill", function(d){return color(d, codeDep);})
			.attr("d", path)
			.style('stroke','black')
			.style('stroke-width', '1px');

	// Dessine les points des différents lieux à visiter
	svg.selectAll("myCircles")
		.data(beachs.features)
		.enter()
		.append("circle")
			.attr("cx", function(d){ return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0] })
			.attr("cy", function(d){ return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1] })
			.attr("r", 14)
			.style('display', function(d){ 
				if(hasToBeShown(d, codeDep,codeLegende)) return "initial";
				else return 'none';
			})
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

}

function color(d, codeDep){
	let color = '';
	let code = d.properties.code;
	if(code == codeDep){
		color = '#88cbce';
	}
	else{
		color = 'white';
	}
	return color;
}

function hasToBeShown(d, codeDep, codeLegende){
	if(d.properties.code_departement == codeDep && d.properties.code_legende == codeLegende) return true;
	else return false;
}

function hover(d,t){
	d3.select(t)
		.attr("r", 20)
		.style("fill-opacity", 0.6);
	// TODO : faire apparaitre explication perso
}

function leave(d,t){
	d3.select(t)
		.attr("r", 14)
		.style("fill-opacity", 0.5);
	// TODO : faire disparaitre explication perso
}

function getCodeDepartement(url){
	return url.split('/')[5];
}

function getCodeLegende(url){
	return url.split('/')[6];
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

let url = window.location.href;

if(url.indexOf('localhost') < 0){
	var codeDep = getCodeDepartement(url);
	var codeLegende = getCodeLegende(url);
	var map = getMapDepartement(codeDep);
}
else{
	var codeDep = 29;
	var codeLegende = 1;
	var map = fin;
}

generateDep(map,mapFusion,codeDep,codeLegende);

window.addEventListener("resize", function(e) {
	generateDep(map,mapFusion,codeDep,codeLegende);
});

