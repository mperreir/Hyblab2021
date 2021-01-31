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
                <i class="fas fa-garage"></i>
                <h4>${record.fields.nom}</h4>
                <p><bold>Téléphone :</bold> ${record.fields.tel}</p>
                <p><bold>Adresse :</bold> ${record.fields.adresse}</p>
                <p><bold>Horaires :</bold> ${record.fields.ouverture}</p>
                <p><bold>Capacité :</bold> ${record.fields.capacite}</p>
                <p><bold>Accès :</bold> ${record.fields.conditions}</p>
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
