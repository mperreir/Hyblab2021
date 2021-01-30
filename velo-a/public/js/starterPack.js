"use strict";

import { abrisVeloDisplayData } from "./modules/abrisVelo.js";
import { getMeteoByTime, getMeteoNow } from "./modules/meteo.js";
import { getStationsVelos } from "./modules/stationsVelos.mjs";
import { getTraficData } from "./modules/trafic.js";

let map;
let marker = {};
let openMarker = undefined;

async function bootstrap() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGpvdmFubmlmb3VpbiIsImEiOiJja2szdGpvMHQxZW1sMm9vNWp0eHJ6ZXR1In0.KJzAGbwYjUS20dFd37YZgw';
    map = new mapboxgl.Map({
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
        placeholderOrigin: 'Adresse de départ à Nantes',
        placeholderDestination: 'Adresse d\'arrivée à Nantes',
        controls: {
            profileSwitcher: false,
            instructions: false
        }
    });

    control.on("route", async routes => {
        if (!routes || !routes.route || !routes.route[0]) return;
        const { steps, distance, duration } = routes.route[0]["legs"][0];
        const roadNames = steps.map(s => s.name).filter((value, index, self) => self.indexOf(value) === index && value.length > 0);

        getTraficData({ roadNames, distance, duration });
    });

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if( urlParams.get('bicloo') ) {
        abrisVeloDisplayData().then(data => {
            points("station_bicloo", data, "img/station.svg");
        });
    }

    if( urlParams.get('abris') ) {
        getStationsVelos().then(data => {
            points("abris_velo", data, "img/abris.svg");
        });
    }

    getMeteoNow();
    getMeteoByTime(Date.now());
}

bootstrap();

function points(varName, data, url) {

    data.forEach((d) => {
        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = `url(${url})`;

        el.addEventListener("click", function (event) {
            // close the holde popup (if active)
            if (openMarker) openMarker._popup.remove();
            // open the popup
            marker._popup.addTo(map)
            openMarker = marker;
            event.stopPropagation();
        });

        if( !marker[varName] ) marker[varName] = [];
        marker[varName].push( new mapboxgl.Marker(el)
            .setLngLat([d.longitude, d.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(d.text))
            .addTo(map));
    });
}
