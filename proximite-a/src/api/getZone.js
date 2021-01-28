import request from './request';

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
    "amenity=restaurant",
    "amenity=give_box",
    "amenity=marketplace",
    "amenity=toilets",
    "amenity=hospital",
];

export const POINT_TYPES = {
    culture,
    fetard,
    tourisme,
    sportif,
    famille,
    tous
};

export async function getPointsInZoneForProfil(zone, profil) {
    return await getPointsInZone(zone,[...POINT_TYPES[profil], ...POINT_TYPES['tous']])
}

export async function getPointsInZone(zone, types) {
    const query = buildQuery(types, zone);
    let res = await request.request(query, null);
    let json = await res.json();
    return json;
}

export const buildQuery = (types, zone) => {
    let query = "https://overpass-api.de/api/interpreter?data=[out:json];";
    let area = getBoxFromZone(zone);
    query += "area(" + area + ");("
 
    // ajout des filtres de type de lieu
    types.forEach(element => {
        if(element && element !== "") {
            let filtre = "node(area)[" + element + "];";
            query += filtre;
        }
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

//https://overpass-api.de/api/interpreter?data=[out:json];area(47.264113,%20-1.573835,%2047.264492,%20-1.573586);node[tourism];out;
const getBoxFromZone = (zone) => {
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