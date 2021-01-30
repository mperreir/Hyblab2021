"use strict";

const ABRIS_VELO_API_URL = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_abris-velos-nantes-metropole&q=&rows=500&facet=commune&facet=conditions&facet=gestionnaire";

/**
 * Fetch "abris velo" of Nantes Metropole and return them
 * @return {Promise<any>} - Abris velo
 */
const abrisVeloFetchData = () => fetch(ABRIS_VELO_API_URL)
	.then(response => {
		return response.json();
	})
	.catch((error) => {
		console.error("Error:", error);
		return undefined;
	});

/**
 * Display "abris velo" of Nantes Metropole on the map
 * @param {Object} mapboxgl - The Mapbox Map
 * @param {Map} map - The Mapbox Map
 */
export async function abrisVeloDisplayData() {
	const data = await abrisVeloFetchData();

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
			longitude: record.fields.location[1],
			latitude: record.fields.location[0],
			text: html
		}

		markers.push(marker);
	});

	return markers;

}
