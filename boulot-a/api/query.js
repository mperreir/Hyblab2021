'use strict';

const fetch_module = require('node-fetch');

// //////////////////////////////////////////////////////////////////////////////

const base_query = `
[out:json];
({{filters}});
out;`;

const a_filter = 'node[{{filter}}](around:{{radius}}, {{coords}});';

// //////////////////////////////////////////////////////////////////////////////

module.exports.route = function (coords, transport, config) {
	let transportApi;
	switch (transport) {
		case 'motorcar':
			transportApi = 'car';
			break;
		case 'bicycle':
			transportApi = 'bike';
			break;
		case 'foot':
			transportApi = 'foot';
			break;
	
		default:
			transportApi = 'car';
			break;
	}

	const parsedCoord = coords.reduce((accumulator, currentValue) => {
		accumulator += currentValue[1] + ',' + currentValue[0] + ';';
		return accumulator;
	}, '').slice(0, -1);

	const url = new URL(`/routed-${transportApi}/route/v1/driving/${parsedCoord}?`,
		config.route_api_base).href +
        `overview=full&geometries=geojson`

	console.log(url);

	return fetch_module(url, {
		method: 'GET',
		agent: config.proxy !== null ? config.proxy : null
	});
};

module.exports.osm = function (center, radius, config) {
	const amenities = new Set();

	Object.keys(config.amenities).forEach(type => {
		Object.keys(config.amenities[type]).forEach(keys => {
			config.amenities[type][keys].forEach(item => {
				amenities.add(`"${keys}"="${item}"`);
			});
		});
	});

	const filters = [];

	let base_filter = a_filter.replace('{{radius}}', radius);
	base_filter = base_filter.replace('{{coords}}', `${center[0]},${center[1]}`);

	Array.from(amenities).forEach(item => {
		filters.push(base_filter.replace('{{filter}}', item));
	});

	const query = base_query.replace('{{filters}}', Array.from(filters).join('\n'));

	// console.log(query);

	return fetch_module(new URL(config.osm_interpreter, config.osm_api_base).href, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: query,
		agent: config.proxy !== null ? config.proxy : null
	});
};
