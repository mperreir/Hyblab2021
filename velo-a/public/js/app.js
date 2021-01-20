import { ApiNavigation } from "./api/navigation.js";
import { ApiGeocoding } from "./api/geocoding.js";

mapboxgl.accessToken = 'pk.eyJ1IjoiZGpvdmFubmlmb3VpbiIsImEiOiJja2szdGpvMHQxZW1sMm9vNWp0eHJ6ZXR1In0.KJzAGbwYjUS20dFd37YZgw';
const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/djovannifouin/ckk45pdua52v317qwdq0ijclv', // style URL
    center: [-1.5512347469335737,47.21611304880233], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

// Instanciation des APIs
// TODO : ajouter toutes les apis
const apiNavigation = new ApiNavigation(mapboxClient.directions);
const apiGeocoding = new ApiGeocoding(mapboxClient.geocoding);

