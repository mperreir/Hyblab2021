const baseUrl = 'https://data.nantesmetropole.fr/api/records/1.0/search/'
const addParams = (url, params) => {
	const keys = Object.keys(params)
	if (url[url.length - 1] === '/') {
		url = url + '/'
	}
	keys.forEach(key => {
		if (url[url.length - 1] === '/') {
			url = url + '?'
		} else {
			url = url + '&'
		}
		url = url + encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
	})
	return url
}
const headers = new Headers();
const init = {
	method: 'GET',
	headers: headers,
	mode: 'cors',
	cache: 'default'
};
const params = {
	dataset: 'qualite-de-lair-indice-atmo-pays-de-la-loire-par-communes@paysdelaloire',
	q: '',
	lang: 'fr',
	rows: 10,
	start: 0,
	timezone: "Europe/Paris"
}
/*
 sort = Critère de tri (champ ou -champ)
 geofilter.distance = Un point WGS84 et une distance en mètres pour le géopositionnement (latitude, longitude, distance)
 geofilter.polygon = Un polygone formé par une liste de points WGS84 (un seul polygone pour le moment) ((lat1, lon1), (lat2, lon2), (lat3, lon3))
 */
let request = new Request(addParams(baseUrl, params));
fetch(request).then(function (response) {
	const contentType = response.headers.get("content-type");
	if (contentType && contentType.indexOf("application/json") !== -1) {
		return response.json().then(function (json) {
			console.log(json);
		});
	} else {
		console.log("Oops, nous n'avons pas du JSON!");
	}
});
