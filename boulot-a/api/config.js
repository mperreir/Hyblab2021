'use strict';

let https_proxy = require('https-proxy-agent');

// //////////////////////////////////////////////////////////////////////////////
// API keys and other stuff
// //////////////////////////////////////////////////////////////////////////////

module.exports.osm_api_base = 'https://overpass-api.de/';
module.exports.osm_interpreter = 'api/interpreter';

module.exports.route_api_base = 'https://routing.openstreetmap.de';
module.exports.route_query = '';

/**
 * Amenities for a given menu
 */
module.exports.amenities = {
	'pointofinterest': {
		'amenity': ['fountain', 'planetarium', 'monastery', 'clock'],
		'artwork_type': ['statue'],
		'attraction': ['animal'],
		'tourism': ['museum']
	},
	'culinary': {
		'amenity': ['bar', 'biergarten', 'cafe', 'fast_food', 'ice_cream', 'pub']
	},
	'cultural': {
		'amenity': ['monastery', 'place_of_mourning', 'place_of_worship', 'theatre', 'social_centre', 'planetarium', 'fountain', 'community_centre', 'arts_centre'],
		'artwork_type': ['statue'],
		'tourism': ['museum', 'gallery'],
		'historic': ['memorial']
	},
};

module.exports.tags = ['amenity', 'tourism', 'artwork_type'];

// //////////////////////////////////////////////////////////////////////////////
// Proxy
// //////////////////////////////////////////////////////////////////////////////

module.exports.proxy = process.env.HTTPS_PROXY ? new https_proxy(process.env.HTTPS_PROXY) : null;
