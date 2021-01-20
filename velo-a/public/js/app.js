'use strict';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGpvdmFubmlmb3VpbiIsImEiOiJja2szdGpvMHQxZW1sMm9vNWp0eHJ6ZXR1In0.KJzAGbwYjUS20dFd37YZgw';
const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/djovannifouin/ckk45pdua52v317qwdq0ijclv', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});
