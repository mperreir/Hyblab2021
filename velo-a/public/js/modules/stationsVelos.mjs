"use strict";

const STATIONS_VELO_API_URL = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_stations-velos-libre-service-nantes-metropole&q=&rows=1000&facet=commune&facet=descriptif";

const stationsVeloFetchData = () => fetch(STATIONS_VELO_API_URL)
	.then(response => {
		return response.json();
	})
	.catch(() => {
	});

let data;

export async function getStationsVelos() {
	if (!data) data = await stationsVeloFetchData();

	if (!data || !data.records || !data.records.length) return;

	const markers = [];

	data.records.forEach((record) => {

		const html =
			`<div>
                <h4>${record.fields.nom}</h4>
                <p><b>Téléphone :</b> ${record.fields.tel}</p>
                <p><b>Adresse :</b> ${record.fields.adresse}</p>
                <p><b>Horaires :</b> ${record.fields.ouverture}</p>
                <p><b>Capacité :</b> ${record.fields.capacite}</p>
                <p><b>Accès :</b> ${record.fields.conditions}</p>
            </div>`;

		const marker = {
			type: "bicloo",
			class: "marker",
			url: "img/markers/station.svg",
			longitude: record.fields.geo_shape.coordinates[0],
			latitude: record.fields.geo_shape.coordinates[1],
			text: html
		}

		markers.push(marker);
	});

	return markers;
}

