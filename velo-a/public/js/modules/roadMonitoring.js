"use strict";

const TRAFIC_API_URL = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_fluidite-axes-routiers-nantes-metropole&q=&rows=1000&facet=couleur_tp&exclude.etat_trafic=Ind%C3%A9termin%C3%A9";

const traficFetchData = () => fetch(TRAFIC_API_URL)
	.then(response => {
		return response.json();
	})
	.catch((error) => {
	});

let data;

export async function getTraficData(trajet) {
	if (!data) data = await traficFetchData();

	if (!data || !data.records || !data.records.length) return;

	const { roadNames, distance, duration } = trajet
	const roadNamesIds = roadNames.map(name => name.split(/([' ])/gm).pop().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
	const types = { "Fluide": 1, "Dense": 2, "Saturé": 3, "Bloqué": 4 };

	let trafic = 0;
	let sum = 0;

	data.records.forEach(record => {
		const { cha_lib: name, etat_trafic } = record["fields"];
		const id = name.split(" ")[0];

		if (roadNamesIds.includes(id)) {
			trafic += types[etat_trafic];
			sum++;
		}
	});

	let indice = Math.round(trafic / sum);
	if(isNaN(indice)) indice = 1;
	let traficFluidity;

	for (const [k, v] of Object.entries(types)) {
		if (v === indice) {
			traficFluidity = k;
			break;
		}
	}

	localStorage.setItem("fluiditeTrajet", traficFluidity);
	localStorage.setItem("distanceTrajet", distance);
	localStorage.setItem("dureeTrajet", duration);
}

