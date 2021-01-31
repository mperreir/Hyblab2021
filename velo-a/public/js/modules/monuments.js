"use strict";

const MONUMENTS_API_URL = "resources/monuments.json";

/**
 * Fetch "monuments" of Nantes Metropole and return them
 * @return {Promise<any>} - Monuments
 */
const monumentsFetchData = () => fetch(MONUMENTS_API_URL)
    .then(response => {
        return response.json();
    })
    .catch((error) => {
        console.error("Error:", error);
        return undefined;
    });

let data;

/**
 * Display "abris velo" of Nantes Metropole on the map
 * @param {Object} mapboxgl - The Mapbox Map
 * @param {Map} map - The Mapbox Map
 */
export async function monumentsDisplayData() {
    if (!data) data = await monumentsFetchData();

    return data.monuments;
}