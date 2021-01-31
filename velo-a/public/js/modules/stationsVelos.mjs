"use strict";

const STATIONS_VELO_API_URL = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_stations-velos-libre-service-nantes-metropole&q=&rows=1000&facet=commune&facet=descriptif";

const stationsVeloFetchData = () => fetch(STATIONS_VELO_API_URL)
	.then(response => {
		return response.json();
	})
	.catch((error) => {
	});

let data;
export async function getStationsVelos() {
	if (!data) data = await stationsVeloFetchData();

	if (!data || !data.records || !data.records.length) return;

	const markers = [];

	data.records.forEach((record) => {

		const html =
			`<div>
                <i class="fas fa-garage"></i>
                <p>${record.fields.nom}</p>
                <p><bold>Téléphone :</bold> ${record.fields.tel}</p>
                <p><bold>Adresse :</bold> ${record.fields.adresse}</p>
                <p><bold>Horaires :</bold> ${record.fields.ouverture}</p>
                <p><bold>Capacité :</bold> ${record.fields.capacite}</p>
                <p><bold>Accès :</bold> ${record.fields.conditions}</p>
            </div>`;

		const marker = {
			type: "bicloo",
			class: "marker",
			url: "img/station.svg",
			longitude: record.fields.geo_shape.coordinates[0],
			latitude: record.fields.geo_shape.coordinates[1],
			text: html
		}

		markers.push(marker);
	});

	return markers;
}

