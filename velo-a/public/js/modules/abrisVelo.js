"use strict";

const ABRIS_VELO_API_URL = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_abris-velos-nantes-metropole&q=&rows=1000&facet=commune&facet=conditions&facet=gestionnaire";

/**
 * Fetch "abris velo" of Nantes Metropole and return them
 * @return {Promise<any>} - Abris velo
 */
const abrisVeloFetchData = () => fetch(ABRIS_VELO_API_URL)
	.then(response => {
		return response.json();
	})
	.catch((error) => {
	});

let data;

/**
 * Display "abris velo" of Nantes Metropole on the map
 * @param {Object} mapboxgl - The Mapbox Map
 * @param {Map} map - The Mapbox Map
 */
export async function abrisVeloDisplayData() {
	if (!data) data = await abrisVeloFetchData();

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
			type: "abris",
			class: "marker",
			url: "img/markers/abris.svg",
			longitude: record.fields.location[1],
			latitude: record.fields.location[0],
			text: html
		}

		markers.push(marker);
	});

	return markers;

}
