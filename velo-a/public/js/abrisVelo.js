const ABRIS_VELO_API_URL = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_abris-velos-nantes-metropole&q=&rows=500&facet=commune&facet=conditions&facet=gestionnaire";

/**
 * Fetch "abris velo" of Nantes Metropole and return them
 * @return {Promise<any>} - Abris velo
 */
const abrisVeloFetchData = () => fetch(ABRIS_VELO_API_URL)
    .then(response => {
        return response.json();
    })
    .catch((error) => {
        console.error("Error:", error);
        return undefined;
    });

/**
 * Display "abris velo" of Nantes Metropole on the map
 * @param {Object} mapboxgl - The Mapbox Map
 * @param {Map} map - The Mapbox Map
 */
export async function abrisVeloDisplayData(mapboxgl, map) {
    const data = await abrisVeloFetchData();

    if (!data || !data.records || !data.records.length) return;

    data.records.forEach((record) => {
        // create a DOM element for the marker
        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = "url(https://svgshare.com/i/TVr.svg)";
        el.style.backgroundSize = "contain";
        el.style.width = "24px";
        el.style.height = "24px";

        // add marker to map
        new mapboxgl.Marker(el)
            .setLngLat([record.fields.location[1], record.fields.location[0]])
            .setPopup(new mapboxgl.Popup().setHTML(`
            <div>
            <i class="fas fa-garage"></i>
            <h4>${record.fields.nom}</h4>
            <h5><bold>Téléphone :</bold> ${record.fields.tel}</h5>
            <h5><bold>Adresse :</bold> ${record.fields.adresse}</h5>
            <h5><bold>Horaires :</bold> ${record.fields.ouverture}</h5>
            <h5><bold>Capacité :</bold> ${record.fields.capacite}</h5>
            <h5><bold>Accès :</bold> ${record.fields.conditions}</h5>
            </div>
            `))
            .addTo(map);
    });
}
