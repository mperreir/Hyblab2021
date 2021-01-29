"use strict";

import { abrisVeloDisplayData } from "./modules/abrisVelo.js";
import { getMeteoByTime, getMeteoNow } from "./modules/meteo.js";
import { getStationsVelos } from "./modules/stationsVelos.mjs";
import { getTraficData } from "./modules/trafic.js";

async function bootstrap() {

	mapboxgl.accessToken = 'pk.eyJ1IjoiZGpvdmFubmlmb3VpbiIsImEiOiJja2szdGpvMHQxZW1sMm9vNWp0eHJ6ZXR1In0.KJzAGbwYjUS20dFd37YZgw';
	const map = new mapboxgl.Map({
		container: 'map', // container id
		style: 'mapbox://styles/djovannifouin/ckk45pdua52v317qwdq0ijclv', // style URL
		center: [-1.5512347469335737, 47.21611304880233], // starting position [lng, lat]
		zoom: 11 // starting zoom
	});

	// Départ et arrivée: https://github.com/mapbox/mapbox-gl-directions/blob/master/API.md
	let control = new MapboxDirections({
		accessToken: mapboxgl.accessToken,
		unit: 'metric',
		profile: 'mapbox/cycling',
		language: 'fr',
		alternatives: true,
		placeholderOrigin: 'Adresse de départ à Nantes',
		placeholderDestination: 'Adresse d\'arrivée à Nantes',
		controls: {
			profileSwitcher: false,
			instructions: false
		}
	});

	control.on("route", async routes => {
		if (!routes || !routes.route || !routes.route[0]) return;
		const { steps, distance, duration } = routes.route[0]["legs"][0];
		const roadNames = steps.map(s => s.name).filter((value, index, self) => self.indexOf(value) === index && value.length > 0);

		getTraficData({ roadNames, distance, duration });
	});

	document.getElementById('mapbox-controllers').appendChild(control.onAdd(map))

	let openMarker = undefined;

	function points(data, url) {

		data.forEach((d) => {
			const el = document.createElement("div");
			el.className = "marker";
			el.style.backgroundImage = `url(${url})`;

			let marker;
			el.addEventListener("click", function (event) {
				// close the holde popup (if active)
				if (openMarker) openMarker._popup.remove();
				// open the popup
				marker._popup.addTo(map)
				openMarker = marker;
				event.stopPropagation();
			});


			marker = new mapboxgl.Marker(el)
				.setLngLat([d.longitude, d.latitude])
				.setPopup(new mapboxgl.Popup().setHTML(d.text))
				.addTo(map);
		});
	}

	abrisVeloDisplayData().then(data => {
		points(data, "img/abris.svg");
	});

	getStationsVelos().then(data => {
		points(data, "img/station.svg");
	});

	getMeteoNow();
	getMeteoByTime(Date.now());
}

bootstrap();

// document.getElementById("button-question").onclick = () => {
// 	document.location.href = "question.html?page=météo";
// }

document.getElementById("input-meteo").onclick = () => {
	document.location.href = "question.html?page=météo";
};

document.getElementById("input-pollution").onclick = () => {
	document.location.href = "question.html?page=pollution";
};

document.getElementById("input-activite").onclick = () => {
	document.location.href = "question.html?page=activité";
};

document.getElementById("input-vae").onclick = () => {
	document.location.href = "question.html?page=VAE";
};

document.getElementById("btn-menu-nav").onclick = () => {
	let nav_visible = window.getComputedStyle(document.getElementById("left-nav"),null).getPropertyValue('visibility');
	if(nav_visible === "hidden"){
		document.getElementById("left-nav").setAttribute("style", "visibility: visible");
		document.getElementById("btn-menu-nav").classList.remove("button-menu");
		document.getElementById("btn-menu-nav").classList.add("button-cross");
	}else{
		document.getElementById("left-nav").setAttribute("style", "visibility: hidden");
		document.getElementById("btn-menu-nav").classList.add("button-menu");
		document.getElementById("btn-menu-nav").classList.remove("button-cross");
	}
};