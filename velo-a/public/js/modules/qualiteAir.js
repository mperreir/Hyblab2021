"use strict";

export async function getAirQuality() {
	return fetch("https://data.nantesmetropole.fr/api/records/1.0/search/?rows=1&disjunctive.lib_zone=true&sort=date_ech&q=nantes&q=&refine.lib_zone=Nantes+M%C3%A9tropole&start=0&fields=lib_qual&dataset=323266205-qualite-de-l-air-indice-atmo-pays-de-la-loire@paysdelaloire&timezone=UTC&lang=fr")
		.then(res => res.json())
		.then(data => {
			return data.records[0].fields.lib_qual;
		})
		.catch(err => {
		});
}
