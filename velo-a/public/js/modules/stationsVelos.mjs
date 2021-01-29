"use strict";

const STATIONS_VELO_API_URL = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_stations-velos-libre-service-nantes-metropole&q=&facet=commune&facet=descriptif";

const stationsVeloFetchData = () => fetch(STATIONS_VELO_API_URL)
	.then(response => {
		return response.json();
	})
	.catch((error) => {
		console.error("Error:", error);
		return undefined;
	});

export async function getStationsVelos() {
	const data = await stationsVeloFetchData();

	if (!data || !data.records || !data.records.length) return;

	const markers = [];

	data.records.forEach((record) => {

		const html =
			`<div>
                <i class="fas fa-garage"></i>
                <h4>${record.fields.nom}</h4>
                <h5><bold>Téléphone :</bold> ${record.fields.tel}</h5>
                <h5><bold>Adresse :</bold> ${record.fields.adresse}</h5>
                <h5><bold>Horaires :</bold> ${record.fields.ouverture}</h5>
                <h5><bold>Capacité :</bold> ${record.fields.capacite}</h5>
                <h5><bold>Accès :</bold> ${record.fields.conditions}</h5>
            </div>`;

		const marker = {
			longitude: record.fields.geo_shape.coordinates[0],
			latitude: record.fields.geo_shape.coordinates[1],
			text: html
		}

		markers.push(marker);
	});

	return markers;
}

