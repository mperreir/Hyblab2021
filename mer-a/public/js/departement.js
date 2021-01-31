'use strict';

/**
 * Specific constants definition
 */

map = getMapDepartement(router.data.department);

persoBox = document.querySelector('#character');


/**
 * The main function in ASYNC.
 */
(async () => {
	let legendes = null;
	let validRegions = null;
	if(!categories) await getTypesId(r => categories = r);
	await getRegionsId(r => validRegions = r);
	if(!departements) departements = validRegions;
	await getLegendes(router.data.department, router.data.personnage, r => legendes = r);
	
	let narrator = new Narrator($('#narration')[0], $('#narration > span.to-narrate')[0], $('#narration > button.pass_narration')[0], 45,
		{ title: $('#narration > span.title')[0] },
		{ timeout: null },
		{ baseText: null });

	let map = new Map(mapFusion, '#department', validRegions.find(r => r.id === router.data.department),
	() => {
		let center = d3.geoCentroid(map);
		let seaBorder = d3.geoBounds(map);
		console.log(map.validRegions);
		map.validRegions.find(r => console.log(r));
		switch(map.validRegions.find(r => r.id === router.data.department).frontiereMer) {
			case 'top':
				center = [center[0], seaBorder[1][1]];
				break;
			case 'right':
				seaBorder = [seaBorder[1][0], center[1]];
				break;
			case 'bottom':
				seaBorder = [center[0], seaBorder[0][1]];
				break;
			case 'left':
				seaBorder = [seaBorder[0][0], center[1]];
				break;
		}
		return center;
	},
	null,
	(svg, path) => {
		// Dessine les points des différents lieux à visiter
		svg.selectAll("myCircles")
		.data(legendes)
		.enter()
		.append("circle")
			.attr("id", function(d){ return 'dot_legende_' + d.id; })
			.attr("lbl-legende-id", function(d){ return d.id; })
			.attr("cx", function(d){ return path.projection([d.longitude, d.latitude])[0]; })
			.attr("cy", function(d){ return path.projection([d.longitude, d.latitude])[1]; })
			.attr("r", map.circlesSize)
			.style("fill", map.circlesColor)
			.attr("stroke", map.circlesColor)
			.attr("stroke-width", map.circlesStrokeWidth)
			.attr("fill-opacity", map.circlesOpacity)
			.on('mouseover', function(d){
				hoverDot(this, narrator);
				document.getElementById('label_legende_' + this.getAttribute('lbl-legende-id')).style.display = 'block';
			})
			.on('mouseleave', function(d){
				leaveDot(this, narrator);
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
	});
	categorie = getCategorie(router.data.personnage);
	narrator.setText(categorie.phraseDep);
	narrator.properties.baseText = categorie.phraseDep;
	narrator.load();
	map.generateMap();
	loadCharacter();
	perso = document.getElementById('character_image');
	narrator.start();
	setTimeout(() => perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`,500);
	/**
	* When the window is resized, we update the view.
	*/
	window.addEventListener("resize", function() {
		perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`;
		narrator.load();
		generateDep(mapFusion, narrator);
	});
})();
