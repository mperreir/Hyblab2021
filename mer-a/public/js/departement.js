'use strict';

/**
 * The main function in ASYNC.
 */
(async () => {
	let legendes = null;
	let validRegions = null;
	let persoBox = document.querySelector('#character');
	if(!router.data.categories) await getTypesId(r => router.data.categories = r);
	await getRegionsId(r => validRegions = r);
	if(!router.data.departement) router.data.departement = validRegions;
	await getLegendes(router.data.department, router.data.personnage, r => legendes = r);
	globalLegendes = legendes;
	
	let narrator = new Narrator($('#narration')[0], $('#narration > span.to-narrate')[0], $('#narration > button.pass_narration')[0], 45,
		{ title: $('#narration > span.title')[0] },
		{ timeout: null },
		{ baseText: null, legendes: legendes });

	let map = new Map(mapFusion, '#department', [validRegions.find(r => r.id === router.data.department)],
	() => {
		let validPath = map.getMapDepartement(router.data.department);
		let center = d3.geoCentroid(validPath);
		let seaBorder = d3.geoBounds(validPath);
		switch(map.validRegions.find(r => r.id === router.data.department).frontiereMer) {
			case 'top':
				center = [center[0], ((seaBorder[1][1]+center[1]) / 2)];
				break;
			case 'right':
				center = [((seaBorder[1][0]+center[0]) / 2), center[1]];
				break;
			case 'bottom':
				center = [center[0], ((seaBorder[0][1]+center[1]) / 2)];
				break;
			case 'left':
				center = [((seaBorder[0][0]+center[0]) / 2), center[1]];
				break;
		}
		return center;
	},
	16,
	null,
	(svg, _, projection) => {
		// Dessine les points des différents lieux à visiter
		svg.selectAll("myCircles")
		.data(legendes)
		.enter()
		.append("circle")
			.attr("id", function(d){ return 'dot_legende_' + d.id; })
			.attr("lbl-legende-id", function(d){ return d.id; })
			.attr("cx", function(d){ return projection([d.longitude, d.latitude])[0]; })
			.attr("cy", function(d){ return projection([d.longitude, d.latitude])[1]; })
			.attr("r", map.circlesSize)
			.style("fill", map.circlesColor)
			.attr("stroke", map.circlesColor)
			.attr("stroke-width", map.circlesStrokeWidth)
			.attr("fill-opacity", map.circlesOpacity)
			.on('mouseover', function(d){
				hoverDot(this, narrator, map);
				document.getElementById('label_legende_' + this.getAttribute('lbl-legende-id')).style.display = 'block';
			})
			.on('mouseleave', function(d){
				leaveDot(this, narrator, map);
				document.getElementById('label_legende_' + this.getAttribute('lbl-legende-id')).style.display = 'none';
			})
			.on('click', d => {
				selectLegende(parseInt(d.id));
			});

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
				hoverDot(document.getElementById('dot_legende_' + e.target.getAttribute('lbl-legende-id')), map);
			}
			lButton.onmouseleave = (e) => {
				e.target.style.display = 'none';
				leaveDot(document.getElementById('dot_legende_' + e.target.getAttribute('lbl-legende-id')), map);
			}
			lButton.onclick = (e) => selectLegende(parseInt(e.target.getAttribute('lbl-legende-id')));
			document.getElementById('department').appendChild(lButton);
		}
	});
	categorie = getCategorie(router.data.personnage);
	narrator.setText(getCategorie(router.data.personnage).phraseDep);
	narrator.properties.baseText = categorie.phraseDep;
	narrator.load();
	map.generateMap();
	loadCharacter(persoBox);
	let perso = document.getElementById('character_image');
	narrator.start();
	setTimeout(() => perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`,500);
	/**
	* When the window is resized, we update the view.
	*/
	window.onresize = function() {
		perso.style.left = `${(persoBox.offsetWidth-perso.offsetWidth)/2}px`;
		narrator.load();
		map.generateMap();
	};
})();
