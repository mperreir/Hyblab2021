"use strict";

import { abrisVeloDisplayData } from "./modules/abrisVelo.js";
import { getStationsVelos } from "./modules/stationsVelos.mjs";
import { getTraficData } from "./modules/roadMonitoring.js";
import { monumentsDisplayData } from "./modules/monuments.js";
import { reverseGeocoding } from "./modules/autocompleteAddress.js";

async function bootstrap() {

	mapboxgl.accessToken = 'pk.eyJ1IjoiZGpvdmFubmlmb3VpbiIsImEiOiJja2szdGpvMHQxZW1sMm9vNWp0eHJ6ZXR1In0.KJzAGbwYjUS20dFd37YZgw';
	const map = new mapboxgl.Map({
		container: 'map', // container id
		style: 'mapbox://styles/djovannifouin/ckk45pdua52v317qwdq0ijclv', // style URL
		center: [-1.5512347469335737, 47.21611304880233], // starting position [lng, lat]
		zoom: 12.3, // starting zoom
		dragRotate: false,
		keyboard: false,
		touchPitch: false,
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
		},
		geocoder: {
			bbox: "-1.7951350420290169%2C47.116367346841514%2C-1.3050286308555314%2C47.33902195868899"
		}
	});

	map.on('load', function () {
		document.getElementById("map").style.visibility = "visible";
		document.getElementById("static").style.display = "none";

		if (localStorage.getItem("adresseDepart")) directions.setOrigin(localStorage.getItem("adresseDepart"));
		else if (localStorage.getItem("adresseDepartCoord")) directions.setOrigin(localStorage.getItem("adresseDepartCoord").split(','));

		if (localStorage.getItem("adresseArrivee")) directions.setDestination(localStorage.getItem("adresseArrivee"));
		else if (localStorage.getItem("adresseArriveeCoord")) directions.setDestination(localStorage.getItem("adresseArriveeCoord").split(','));
	});


	if (document.getElementById('mapbox-controllers')) {
		document.getElementById('mapbox-controllers').appendChild(directions.onAdd(map));

		directions.on("origin", async origin => {
			if (!origin || origin.feature.geometry.coordinates.join(',') === localStorage.getItem("adresseDepartCoord")) return;

			const address = await reverseGeocoding(origin.feature.geometry.coordinates.join(','));
			localStorage.setItem("adresseDepart", address);
			localStorage.setItem("adresseDepartCoord", origin.feature.geometry.coordinates.join(','));
		});
		directions.on("destination", async destination => {
			if (!destination || destination.feature.geometry.coordinates.join(',') === localStorage.getItem("adresseArriveeCoord")) return;

			const address = await reverseGeocoding(destination.feature.geometry.coordinates.join(','));
			localStorage.setItem("adresseArrivee", address);
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
	let hover = false;

	function points(data) {

		data.forEach((d) => {
			const el = document.createElement("div");
			el.className = d.class;
			el.style.backgroundImage = `url(${d.url})`;

			let marker;
			el.addEventListener("mouseover", function (event) {
				// close the holde popup (if active)
				if (openMarker) openMarker._popup.remove();
				// open the popup
				marker._popup.addTo(map)
				openMarker = marker;

				el.addEventListener("mouseleave", function () {
					setTimeout(() => {
						if (!hover) openMarker._popup.remove();
					}, 200);
				});

				if (document.getElementsByClassName("mapboxgl-popup")[0]) {
					document.getElementsByClassName("mapboxgl-popup")[0].addEventListener("mouseover", function () {
						hover = true;
					});
					document.getElementsByClassName("mapboxgl-popup")[0].addEventListener("mouseleave", function () {
						if (openMarker) openMarker._popup.remove();
						hover = false
					});
				}
			});

			marker = new mapboxgl.Marker(el)
				.setLngLat([d.longitude, d.latitude])
				.setPopup(new mapboxgl.Popup().setHTML(d.text))
				.addTo(map);

			if (!markers[d.type]) markers[d.type] = [marker];
			else markers[d.type].push(marker);
		});
	}

	const veloType = localStorage.getItem("velo");
	const butTrajet = localStorage.getItem("butTrajet");

	if (!veloType || (veloType !== "bicloo" && butTrajet !== "bosser" && butTrajet !== "pioncer")) {
		abrisVeloDisplayData().then(data => {
			points(data);
		});
		if (document.getElementById("abris_velo"))
			document.getElementById("abris_velo").checked = true;
	}

	if (!veloType || veloType === "bicloo") {
		getStationsVelos().then(data => {
			points(data);
		});
		if (document.getElementById("station_bicloo"))
			document.getElementById("station_bicloo").checked = true;
	}

	if (butTrajet === "flaner") {
		monumentsDisplayData().then(data => {
			points(data);
		});
		if (document.getElementById("monuments"))
			document.getElementById("monuments").checked = true;
	}

	if (document.getElementById("abris_velo"))
		document.getElementById("abris_velo").addEventListener("change", event => {
			if (event.target.checked) {
				abrisVeloDisplayData().then(data => {
					points(data);
				});
			} else {
				markers["abris"].forEach((marker) => marker.remove());
			}
		});

	if (document.getElementById("station_bicloo"))
		document.getElementById("station_bicloo").addEventListener("change", event => {
			if (event.target.checked) {
				getStationsVelos().then(data => {
					points(data);
				});
			} else {
				markers["bicloo"].forEach((marker) => marker.remove());
			}
		});

	if (document.getElementById("monuments"))
		document.getElementById("monuments").addEventListener("change", event => {
			if (event.target.checked) {
				monumentsDisplayData().then(data => {
					points(data);
				});
			} else {
				markers["monuments"].forEach((marker) => marker.remove());
			}
		});

	document.querySelectorAll("#left-nav > p").forEach(() => {

	})

}

function closeOops() {
	document.getElementById("oops").style.setProperty("display", "none");
	document.getElementById("filtre_oops").style.setProperty("display", "none");
}

window.addEventListener('DOMContentLoaded', () => {

	if (document.getElementById("valider"))
		document.getElementById("valider").addEventListener("click", () => {
			if (localStorage.getItem("adresseDepart") && localStorage.getItem("adresseArrivee")) {
				document.location = 'starterPack.html';
			} else {
				document.getElementById("oops").style.setProperty("display", "flex");
				document.getElementById("filtre_oops").style.setProperty("display", "inherit");

				document.getElementById("filtre_oops").addEventListener("click", closeOops);
				document.getElementById("oops_ok").addEventListener("click", closeOops);

			}
		})
	bootstrap();
});

if (document.getElementById("btn-menu-nav"))
	document.getElementById("btn-menu-nav").onclick = () => {
		let nav_visible = document.getElementById("left-nav").style.getPropertyValue('left');
		if (nav_visible === "-100%") {
			document.getElementById("left-nav").setAttribute("style", "left: 0");
			document.getElementById("btn-menu-nav").classList.remove("button-menu");
			document.getElementById("btn-menu-nav").classList.add("button-cross");
		} else {
			document.getElementById("left-nav").setAttribute("style", "left: -100%");
			document.getElementById("btn-menu-nav").classList.add("button-menu");
			document.getElementById("btn-menu-nav").classList.remove("button-cross");
		}
	};
