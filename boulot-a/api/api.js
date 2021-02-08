'use strict';

const queryModule = require('./query.js');
const utils = require('./utils.js');

// /////////////////////////////////////
// HTTP codes:
// 200 OK
// 201 Created
// 202 Accepted
// 203 Non-Authoritative Information (since HTTP/1.1)
// 204 No Content
// 205 Reset Content
//
// 400 Bad Request
// 401 Unauthorized (RFC 7235)
// 402 Payment Required
// 403 Forbidden
// 404 Not Found
// 405 Method Not Allowed
// 406 Not Acceptable
// 407 Proxy Authentication Required
//
// 500 Internal Server Error
// 501 Not Implemented
// 502 Bad Gateway
// 503 Service Unavailable
// 504 Gateway Timeout
// /////////////////////////////////////

const Status = {
    Success: {
        Ok: 200,
        Created: 201,
        NoContent: 204
    },
    Fail: {
        BadRequest: 400,
        Unauthorized: 401
    },
    Error: {
        InternalServerError: 500,
        NotImplemented: 501,
        BadGateway: 502,
        ServiceUnavailable: 503
    }
};

/**
 * This function will build a json response with the format given below :
 *
 * {"errors":[],"data":payload}
 *
 * If there is error(s) to return, these will be in errors array.
 * If there is data, payload will be JSON.stringified and put into the value
 * of data key.
 *
 * Ex:dataaaaa
 * @param {*} response The express response object
 * @param {*} status_code Use Status.XXX.XX
 * @param {*} errors An array of error (if any)
 * @param {*} payload An object containing the data (will be JSON.stringify)
 */
const BuildResponse = function (response, status_code, errors, payload) {
    const response_body = {
        errors: errors,
        data: payload
    };

    response.status(status_code).json(response_body).end();
};

const SetupRoutes = function (api_app, config) {
    api_app.post('/generate_story/',
        [/* body('XXXXX0', 'Invalid XXXXX').exists()*/],
        function (request, response) {
            console.log('New API request : ' + JSON.stringify(request.body, null, 2));

            if (!request.body.homeCoords || !request.body.workCoords ||
                !request.body.transport || !request.body.menu) {
                BuildResponse(response, Status.Fail.BadRequest, ['Il manque des parametres pour la requete'], {});
                return;
            }

            // [out:json];
            // node[''](around:100, 50.61193,-4.68711);

            let radius = utils.calcCrow(request.body.homeCoords, request.body.workCoords) * 0.5 * 1000;
            if (radius < 500) {
                radius *= 1.5;
            }
            queryModule.osm([(request.body.homeCoords[0] + request.body.workCoords[0]) * 0.5,
            (request.body.homeCoords[1] + request.body.workCoords[1]) * 0.5],
                radius,
                config)
                .then((data) => data.json())
                .then((data) => {
                    let newData = {};
                    Object.keys(config.amenities).forEach(type => { newData[type] = []; });
                    data.elements.forEach(node => {
                        Object.keys(config.amenities).forEach(type => {
                            Object.keys(config.amenities[type]).forEach(key => {
                                if (node.tags[key] !== undefined) {
                                    config.amenities[type][key].forEach(item => {
                                        if (node.tags[key] === item) {
                                            node['shortDescr'] = item;
                                            newData[type].push(node);
                                        }
                                    });
                                }
                            });
                        });
                    });
                    return newData;
                })
                .then((datas) => {
                    let weights = {};
                    Object.keys(config.amenities).forEach(type => { weights[type] = request.body.menu[type]; });

                    const sum = Object.keys(weights).reduce((accumulator, current_value) => accumulator + weights[current_value], 0);

                    if (sum === 0) {
                        Object.keys(weights).forEach(type => { weights[type] = 1 / Object.keys(config.amenities).length; });
                    } else {
                        Object.keys(weights).forEach(type => { weights[type] = weights[type] / sum; });
                    }

                    // console.log(JSON.stringify(datas, null, 1));

                    const places = [];

                    try {
                        for (let i = 0; i < 3; ++i) {
                            let validPlaceFound = false;
                            while (!validPlaceFound) {
                                const randomType = utils.weightedRandom(weights);
                                // console.log(randomType);
                                if (datas[randomType].length === 0) {
                                    // Pas de Poi dans cette categorie
                                    break;
                                }

                                const index = Math.floor(Math.random() * datas[randomType].length);
                                const element = datas[randomType][index];

                                // console.log(index, datas[randomType].length);

                                // Nous le supprimons pour ne pas retomber dessus (s'il est valide il sera utilisé,
                                // sinon dans tous les cas il ne serat pas utilisé)
                                datas[randomType].splice(index, 1);


                                if (element.tags.name !== undefined &&
                                    element.tags.name !== '') {
                                    places.push({
                                        'name': element.tags.name,
                                        'coord': [element.lat, element.lon],
                                        'type': randomType,
                                        'shortDescr': element.shortDescr,
                                        'image': '',
                                        'text': '',
                                    });

                                    // console.log('Found a PoI', element);

                                    validPlaceFound = true;
                                }
                            }
                        }
                    }
                    catch (error) {
                        // console.log(error);
                    }

                    // Gros bordel
                    if (request.body.schoolCoords !== null) {
                        places.push({
                            'name': 'school',
                            'coord': [request.body.schoolCoords[0], request.body.schoolCoords[1]],
                            'type': 'school',
                            'image': '',
                            'text': '',
                        });
                    }
                    let home = {
                        'name': 'home',
                        'coord': [request.body.homeCoords[0], request.body.homeCoords[1]],
                        'type': 'home',
                        'image': '',
                        'text': '',
                    };
                    let work = {
                        'name': 'work',
                        'coord': [request.body.workCoords[0], request.body.workCoords[1]],
                        'type': 'work',
                        'image': '',
                        'text': '',
                    };

                    let ordonatedPlaces;
                    if (!request.body.startFromHome) {
                        ordonatedPlaces = utils.getShortestPath(home, work, places);
                    }
                    else {
                        ordonatedPlaces = utils.getShortestPath(work, home, places);
                    }

					queryModule.route(ordonatedPlaces.map(place => place.coord), request.body.transport, config)
					.then(data => data.json())
					.then(result => {
						console.log(result);
						let path = {
							'distance': result.routes[0].distance,
							'traveltime': result.routes[0].duration,
							'coordinates': result.routes[0].geometry.coordinates.map(coordinate => [coordinate[1], coordinate[0]]),
						};

						for (let i = 0; i < result.routes[0].legs.length; i++) {
							ordonatedPlaces[i].path = {
								'distance' : result.routes[0].legs[i].distance,
								'traveltime' : result.routes[0].legs[i].duration,
							};
						}

						const responseAPI = {
							'places': ordonatedPlaces,
							'path': path
						};
						BuildResponse(response, Status.Success.Ok, [/* err*/], responseAPI);
						console.log('New response : ' + JSON.stringify(responseAPI, (key, value) => {
							if (key === 'coordinates') {
								return value.length;
							}
							return value;
						}, 2));
					}).catch((err) => {
						console.log(err);
						BuildResponse(response, Status.Fail.BadRequest, [err], {});
					});
                }).catch((err) => {
                    console.log(err);
                    BuildResponse(response, Status.Fail.BadRequest, [err], {});
                });
        });
};

module.exports = function (express_module, config) {
    const api_app = express_module();
    api_app.use(express_module.json());

    SetupRoutes(api_app, config);

    return api_app;
};
