'use strict'

function generateMap(mapData, mapFusion){

	var width = window.innerWidth-5;
	var height = window.innerHeight-5;

	var svg = d3.select("#bretagne")
		.html('')
		.append('svg')
		.attr("width", width)
		.attr("height", height);

	// Place le centre de la map
	var center = d3.geoCentroid(mapData);

	// Projection des longitudes et latitudes
	var projection = d3.geoMercator()
		.center(center)
		.scale(width*13)
		.translate([ width /2, height/2 ])

	var path = d3.geoPath().projection(projection);


	// Dessine la map
	svg.append("g")
		.selectAll("path")
		.data(mapFusion.features)
		.enter()
		.append("path")
			.attr('id',function(d) { return 'path_' + d.properties.code})
			.attr("fill", function(d){return color(d);})
			.attr("d", path)
			.on('mouseover', function(d){ hover(d.properties.code,this);})
			.on('mouseleave', function(d){ leave(d.properties.code,this);})
			.on('click', function(d){ selectDepartment(d.properties.code);})
			.style('stroke','black')
			.style('stroke-width', '1px');

	// Place les noms des departements
	svg.append("g")
		.selectAll("labels")
		.data(mapData.features)
		.enter()
		.append("text")
			.attr('id', function(d) { return 'text_' + d.properties.code})
			.attr("x", function(d){return path.centroid(d)[0]})
			.attr("y", function(d){return path.centroid(d)[1]})
			.text(function(d){ return d.properties.nom})
			.attr("text-anchor", "middle")
			.attr("alignment-baseline", "central")
			.on('mouseover', function(d){
				let codeDep = d.properties.code;
				if(codeDep == 22 || codeDep == 35) codeDep = 2235;
				let path = document.getElementById('path_' + codeDep);
				hover(codeDep,path);
			})
			.on('mouseleave', function(d){
				let codeDep = d.properties.code;
				if(codeDep == 22 || codeDep == 35) codeDep = 2235;
				let path = document.getElementById('path_' + codeDep); 
				leave(codeDep,path);
			})
			.on('click', function(d){
				let codeDep = d.properties.code;
				if(codeDep == 22 || codeDep == 35) codeDep = 2235;
				selectDepartment(codeDep);})
			.style("font-size", 28)
			.style("fill", "white")
			.style("display",'none');

}

function color(d){
	let codeDep = d.properties.code;	
	if(checkDepartment(codeDep)) return '#88cbce';
	else return 'white';
}

function hover(codeDep,t){

	if(checkDepartment(codeDep)){

		d3.select(t).style("fill-opacity", 0.95);
		d3.select('#text_' + codeDep).style("display", 'initial');
		
		if(codeDep == 2235){
			d3.select('#text_22').style("display", 'initial');
			d3.select('#text_35').style("display", 'initial');
		}
	}
}

function leave(codeDep,t){
	
	if(checkDepartment(codeDep)){

		d3.select(t).style("fill-opacity", 1);
		d3.select('#text_' + codeDep).style("display", 'none');
		
		if(codeDep == 2235){
			d3.select('#text_22').style("display", 'none');
			d3.select('#text_35').style("display", 'none');
		}

	}
}

function checkDepartment(codeDep){
	if(codeDep == 2235 || codeDep == 29 || codeDep == 56) return true;
	else return false;
}


function selectDepartment(codeDep){
	let id = getID(codeDep);
	if(id > 0) document.location.href="https://hyblab.polytech.univ-nantes.fr/mer-a/personnages/" + id; 
}

function getID(code){
	if(checkDepartment(code)) return code;
	else return -1;
}

generateMap(labs,mapFusion);

window.addEventListener("resize", function(e) { 
	generateMap(labs,mapFusion);
});

