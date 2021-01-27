import request from './request';

function getZone(position, transportation) {
    let polygon = null;
    // TODO
    return polygon;
}

const culture = [
    "tourism=museum",
    "amenity=cinema",
    "amenity=arts_centre",
    "amenity=theatre",
    "amenity=place_of_worship",
    "historic",
];

const fetard = [
    "amenity=nightclub",
    "amenity=bar",
    "amenity=biergarten",
    "amenity=fast_food",
    "amenity=pub",
];

const tourisme = [
    "tourism",
    "historic",
];

const sportif = [
    "sport",
    "leisure=swimming_pool",
    "building=stadium",
    "building=sports_hall",
    "leisure=swimming_area",
    "leisure=sports_centre",
    "leisure=pitch",
    "shop=sports",
];

const famille = [
    "amenity=school",
    "amenity=kindergarten",
    "amenity=childcare",
    "leisure=playground",
];

const tous = [
    "\"restaurant\"",
    "amenity=give_box",
    "amenity=marketplace",
    "amenity=toilets",
    "amenity=hospital",
];

export const POINT_TYPES = [
    culture,
    fetard,
    tourisme,
    sportif,
    famille,
    tous
];

/**
 *
 * @param {*} zone
 * @param {Array} types
 */
export async function getPointsInZone(zone, types) {
    const query = buildQuery(types, zone);
    let res = await request.request(query, null);
    console.log(res);

    return res;
}

export const buildQuery = (types, zone) => {
    let query = "https://overpass-api.de/api/interpreter?data=[out:json];";
    let area = "name=Nantes";
    query += "area[" + area + "];("
 
    // ajout des filtres par type de lieu
    types.forEach(categorie => {
        categorie.forEach(element => {
            if(element && element !== "") {
                let filtre = "node(area)[" + element + "];";
                query += filtre;
            }
        });
    });

    query += ");out;";

    return query
}

export let zone = [
    [
        [-1.573835,47.264487],
        [-1.573808,47.264132],
        [-1.573623,47.264113],
        [-1.573586,47.264471],
        [-1.573771,47.26449],
        [-1.573799,47.264492],
        [-1.573817,47.264489],
        [-1.573817,47.264489],
        [-1.573835,47.264487]
    ]
];
export const getBoxFromZone = (zone) => {
    let west=180, east=-180, south=-90, north=90;
    zone = zone[0];
    zone.forEach(point => {
        let longCoor = point[0];
        west = longCoor < west ? longCoor : west;
        east = longCoor > east ? longCoor : east;
        let latCoor = point[1];
        south = latCoor > south ? latCoor : south;
        north = latCoor < north ? latCoor : north;
    });

    return [north, west, south, east];
}