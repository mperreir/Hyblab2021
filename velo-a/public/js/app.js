"use strict";

import { abrisVeloDisplayData } from "./modules/abrisVelo.js";
import { getMeteoByTime, getMeteoNow } from "./modules/meteo.js";
import { getStationsVelos } from "./modules/stationsVelos.mjs";
import { getTraficData } from "./modules/roadMonitoring.js";

async function bootstrap() {

	mapboxgl.accessToken = 'pk.eyJ1IjoiZGpvdmFubmlmb3VpbiIsImEiOiJja2szdGpvMHQxZW1sMm9vNWp0eHJ6ZXR1In0.KJzAGbwYjUS20dFd37YZgw';
	const map = new mapboxgl.Map({
		container: 'map', // container id
		style: 'mapbox://styles/djovannifouin/ckk45pdua52v317qwdq0ijclv', // style URL
		center: [-1.5512347469335737, 47.21611304880233], // starting position [lng, lat]
		zoom: 12.3 // starting zoom
	});

	// Départ et arrivée: https://github.com/mapbox/mapbox-gl-directions/blob/master/API.md
	let directions = new MapboxDirections({
		accessToken: mapboxgl.accessToken,
		unit: 'metric',
		profile: 'mapbox/cycling',
		language: 'fr',
		alternatives: true,
		placeholderOrigin: 'Adresse de départ à Nantes',
		placeholderDestination: 'Adresse d\'arrivée à Nantes',
		interactive: !!document.getElementById('mapbox-controllers'),
		controls: {
			profileSwitcher: false,
			instructions: false
		}
	});

	map.on('load', function () {
		if (localStorage.getItem("adresseDepart")) directions.setOrigin(localStorage.getItem("adresseDepart"));
		else if (localStorage.getItem("adresseDepartCoord")) directions.setOrigin(localStorage.getItem("adresseDepartCoord").split(','));

		if (localStorage.getItem("adresseArrivee")) directions.setDestination(localStorage.getItem("adresseArrivee"));
		else if (localStorage.getItem("adresseArriveeCoord")) directions.setDestination(localStorage.getItem("adresseArriveeCoord").split(','));
	});


	if (document.getElementById('mapbox-controllers')) {
		document.getElementById('mapbox-controllers').appendChild(directions.onAdd(map));

		directions.on("origin", origin => {
			if (!origin || origin.feature.geometry.coordinates.join(',') === localStorage.getItem("adresseDepartCoord")) return;

			localStorage.removeItem("adresseDepart")
			localStorage.setItem("adresseDepartCoord", origin.feature.geometry.coordinates.join(','));
		});
		directions.on("destination", destination => {
			if (!destination || destination.feature.geometry.coordinates.join(',') === localStorage.getItem("adresseArriveeCoord")) return;

			localStorage.removeItem("adresseArrivee")
			localStorage.setItem("adresseArriveeCoord", destination.feature.geometry.coordinates.join(','));
		});

		directions.on("route", async routes => {
			if (!routes || !routes.route || !routes.route[0]) return;
			const { steps, distance, duration } = routes.route[0]["legs"][0];
			const roadNames = steps.map(s => s.name).filter((value, index, self) => self.indexOf(value) === index && value.length > 0);

			getTraficData({ roadNames, distance, duration });
		});

	} else {
		directions.onAdd(map);
	}

	let openMarker = undefined;

	let markers = {};

	function points(data, url, type) {

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

			if (!markers[type]) markers[type] = [marker];
			else markers[type].push(marker);
		});
	}

	const veloType = localStorage.getItem("velo");

	if (!veloType || veloType !== "bicloo") {
		abrisVeloDisplayData().then(data => {
			points(data, "img/abris.svg", "abris");
		});
		document.getElementById("abris_velo").checked = true;
	}

	if (!veloType || veloType === "bicloo") {
		getStationsVelos().then(data => {
			points(data, "img/station.svg", "bicloo");
		});
		document.getElementById("station_bicloo").checked = true;
	}

	document.getElementById("abris_velo").addEventListener("change", event => {
		if (event.target.checked) {
			abrisVeloDisplayData().then(data => {
				points(data, "img/abris.svg", "abris");
			});
		} else {
			markers["abris"].forEach((marker) => marker.remove());
		}
	});

	document.getElementById("station_bicloo").addEventListener("change", event => {
		if (event.target.checked) {
			getStationsVelos().then(data => {
				points(data, "img/station.svg", "bicloo");
			});
		} else {
			markers["bicloo"].forEach((marker) => marker.remove());
		}
	});

	getMeteoNow();
	getMeteoByTime(Date.now());
}

window.addEventListener('DOMContentLoaded', () => {
	bootstrap();
});

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
	let nav_visible = window.getComputedStyle(document.getElementById("left-nav"), null).getPropertyValue('visibility');
	if (nav_visible === "hidden") {
		document.getElementById("left-nav").setAttribute("style", "visibility: visible");
		document.getElementById("btn-menu-nav").classList.remove("button-menu");
		document.getElementById("btn-menu-nav").classList.add("button-cross");
	} else {
		document.getElementById("left-nav").setAttribute("style", "visibility: hidden");
		document.getElementById("btn-menu-nav").classList.add("button-menu");
		document.getElementById("btn-menu-nav").classList.remove("button-cross");
	}
};
