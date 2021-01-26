import { abrisVeloDisplayData } from "./modules/abrisVelo.js";
import { getStationsVelos } from "./modules/stationsVelos.mjs";

async function bootstrap() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGpvdmFubmlmb3VpbiIsImEiOiJja2szdGpvMHQxZW1sMm9vNWp0eHJ6ZXR1In0.KJzAGbwYjUS20dFd37YZgw';
    const map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/djovannifouin/ckk45pdua52v317qwdq0ijclv', // style URL
        center: [-1.5512347469335737, 47.21611304880233], // starting position [lng, lat]
        zoom: 11 // starting zoom
    });

    // Départ et arrivée: https://github.com/mapbox/mapbox-gl-directions/blob/master/API.md
    let control = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/cycling',
        language: 'fr',
        alternatives: true,
        placeholderOrigin: 'Départ',
        placeholderDestination: 'Arrivée',
        controls: {
            profileSwitcher: false,
            instructions: false
        }
    });

    document.getElementById('mapbox-controllers').appendChild(control.onAdd(map))

    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    )

    function points(data, url) {

        data.forEach((d) => {
            const el = document.createElement("div");
            el.className = "marker";
            el.style.backgroundImage = `url(${url})`;

            new mapboxgl.Marker(el)
                .setLngLat([d.longitude, d.latitude])
                .setPopup(new mapboxgl.Popup().setHTML(d.text))
                .addTo(map);
        });
    }

    abrisVeloDisplayData().then(data => {
        points(data, "https://svgshare.com/i/TVr.svg");
    });

    getStationsVelos().then(data => {
        points(data, "https://svgshare.com/i/TUq.svg");
    });
}

bootstrap();

document.getElementById("input-meteo").onclick = () => {
    document.location.href = "question.html?page=météo";
};

document.getElementById("input-pollution").onclick = () => {
    document.location.href = "question.html?page=pollution";
};

document.getElementById("input-activite").onclick = () => {
    document.location.href = "question.html?page=activité";
};

document.getElementById("input-vae").onclick = () => {
    document.location.href = "question.html?page=VAE";
};