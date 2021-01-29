async function getLegendes(region, type, callback) {
    // Retrieve data
    let result = (await (await fetchAsync(ROOT + API_URL + encodeURI(region) + '/' + encodeURI(type), 'GET')).json());
    //Data manipulation
    let legendes = [];
    for(let l of result.data) {
        legendes.push(new Legende(l.id, l.nom, l.departement, l.categorie, l.resume, l.histoire, l.latitude, l.longitude, l.adresse, l.baignade, l.toilettes, l.restaurant, l.photo));
    }
    // Transmit data
    callback(legendes);
    return legendes;
}

async function getRegionsId(callback) {
    // Retrieve data
    let result = (await (await fetchAsync(ROOT + API_URL + API_REGIONS_ID, 'GET')).json());
    // Transmit data
    callback(result);
    return result;
}

async function getTypesId(callback) {
    // Retrieve data
    let result = (await (await fetchAsync(ROOT + API_URL + API_TYPES_ID, 'GET')).json());
    // Transmit data
    callback(result);
    return result;
}

async function getLegendeById(id, callback) {
    // Retrieve data
    let result = (await (await fetchAsync(ROOT + API_URL + API_LEGENDE + id, 'GET')).json());
    // Transmit data
    callback(result);
    return result;
}

// Function to retrieve the result of an URL
async function fetchAsync(url, method) {
    let options = null;
    if (method) {
        options = {method: method};
    }
    let fetch_res = await fetch(url, options);
    if (fetch_res.ok)
        return fetch_res;
    else {
        if (fetch_res.status === 401) {
            //...
        }
        console.error(await fetch_res.text());
    }
}
