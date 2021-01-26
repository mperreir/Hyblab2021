'use strict'

let addresstocoordinates = async function(adresse){
    let adresse2 = adresse.replaceAll(' ', '+');
    console.log(adresse2);
    const url = `https://api-adresse.data.gouv.fr/search/?q=${adresse2}`;
    //console.log(url);
    let response =await fetch(url);
    let data = await response.json();
    let coordinates = {latitude: data.features[0].geometry.coordinates[1], longitude: data.features[0].geometry.coordinates[0]}
    return coordinates;
}

let result = await addresstocoordinates('41 boulevard albert einstein nantes france');
//console.log(result);

export default addresstocoordinates;