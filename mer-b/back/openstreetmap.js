exports.api_url = (filtres) => {

    // angle representing 50 km on the earth's surface
    // d = 2 * pi * r * a / 360, so a is equal to :
    const arc = 360 * 50/(2 * 6371 * Math.PI);

    const prefix = `?data=%5Bout%3Ajson%5D`; // [out:json]
    const bbox = `%5Bbbox%3A${filtres.latitude - arc}%2C${filtres.longitude - arc}%2C${filtres.latitude + arc}%2C${filtres.longitude + arc}%5D%3B%0D`; // [bbox:_,_,_,_];
    const france = `%0A%0D%0Aarea%5Bname%3D"France"%5D%3B%0D`; // area["name"="France"];
    
    const pre_ask = `%0A%0D%0Anode`; // node
    const with_nothing = `%28area%29`; // (area)
    const ask = `%5B"natural"%3D"beach"%5D-%3E.beaches%3B%0D`; // ["natural"="beach"]->.beaches;

    const prefix_output = `%0A++%0D%0A%28.beaches`; // (.beaches
    const sufix_output = `%3B%29%3B%0D`; // ;);

    const sufix = `%0Aout%3B&target=compact`; // out;

    if (!filtres.hasOwnProperty("planning")) {
        return  prefix + bbox + france + pre_ask + with_nothing + ask + prefix_output + sufix_output + sufix;
    } else {
        const harbor = filtres.planning.includes("harbor");
        const lighthouse = filtres.planning.includes("lighthouse");
        const car = filtres.planning.includes("car_park");
    
        const ask_lighthouse = `%0A%28node%5B"man_made"%3D"lighthouse"%5D%28area%29%3Bnode%5B"man_made"%3D"beacon"%5D%28area%29%3B%29-%3E.lighthouse%3B%0D`; // (node["man_made"="lighthouse"](area);node["man_made"="beacon"](area);)->.lighthouse;
        const ask_harbor = `%0Anode%28area%29%5B"harbour"%3D"yes"%5D%5B"seamark%3Atype"%3D"harbour"%5D-%3E.harbor%3B%0D`; // node["harbour"="yes"]["seamark:type"="harbour"](area)->.harbor;
        const ask_car = `%0Anode%28area%29%5B"amenity"%3D"parking"%5D-%3E.parking%3B%0D`; // node["amenity"="parking"](area)->.carpark;
        
        const with_lighthouse = `%28around.lighthouse%3A${(lighthouse?filtres.dist_lighthouse:"0")}%29`; // (around.lighthouse:10000)
        const with_harbor = `%28around.harbor%3A${(harbor?filtres.dist_harbor:"0")}%29`; // (around.harbor:10000)
        const with_car = `%28around.carpark%3A${(car?filtres.dist_car:"0")}%29`; // (around.car:10000)

        const separator_output = `%3B+`; // ;

        return prefix + bbox + france + (harbor ? ask_harbor : ``) + (lighthouse ? ask_lighthouse : ``) + (car ? ask_car : ``) + pre_ask + (harbor ? with_harbor : ``) + (lighthouse ? with_lighthouse : ``) + (car ? with_car : ``) + ask + prefix_output + (harbor ? separator_output + `.harbor` : ``) + (lighthouse ? separator_output + `.lighthouse` : ``) + (car ? separator_output + `.parking` : ``) + sufix_output + sufix;
    }
}

exports.format = (beaches, harbors, lighthouses, car_parks) => {

    let plages = [];
    for (const node of beaches) {
        plages.push({
            latitude: node.lat,
            longitude: node.lon,
            nom: (node.tags.hasOwnProperty("name") ? node.tags.name : null),
            type: (node.tags.hasOwnProperty("surface") ? node.tags.surface : null)
        });
    }

    function nearest(plage, object) {
        let nearest = object[0];
        for (const node in object) {
            if ((plage.latitude - node.latitude)**2 + (plage.longitude - node.longitude)**2 > nearest) {
                nearest = node;
            }
        }
        return nearest;
    }

    if (harbors.length !== 0) {
        for (const node of plages) {
            const harbor = nearest(node, harbors);
            node.port = {
                latitude: harbor.lat,
                longitude: harbor.lon,
                name: (harbor.tags.hasOwnProperty("name") ? harbor.tags.name : null),
            }
        }
    }

    if (lighthouses.length !== 0) {
        for (const node of plages) {
            const lighthouse = nearest(node, lighthouses);
            node.phare = {
                latitude: lighthouse.lat,
                longitude: lighthouse.lon,
                name: (lighthouse.tags.hasOwnProperty("name") ? lighthouse.tags.name : null),
            }
        }
    }

    if (car_parks.length !== 0) {
        for (const node of plages) {
            const car_park = nearest(node, car_parks);
            node.parking = {
                latitude: car_park.lat,
                longitude: car_park.lon,
                name: (car_park.tags.hasOwnProperty("name") ? car_park.tags.name : null),
            }
        }
    }

    return plages
}
