<template>
  <div id="map">
    <div  id="mapContainer" ref="mapCont"></div>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import {http} from "@/config"
import baguette from "@/assets/map/baguette.svg"
import haltere from "@/assets/map/haltere.svg"
import verre from "@/assets/map/verre.svg"
import medicament from '@/assets/map/medicament.svg'
import point from '@/assets/map/point.svg'

export default Vue.component("finalMap", {
  name: "finalMap",
  methods: { async showMap() {
    const platform = new H.service.Platform({
      apikey: 'joMJEQ1I4K91vF4CAijYMD-cvtabfFAY-iHttZRSnto'
    });
    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(this.$refs.mapCont,
    defaultLayers.vector.normal.map,{
      center: {lat:47.218371, lng:-1.553621},
      zoom: 12,
      pixelRatio: window.devicePixelRatio || 1
    });

    window.addEventListener('resize', () => map.getViewPort().resize());

    const choices = this.$root.$data.getChoices();
    await createMap(platform, map, choices)
    }
  },
  mounted: function () {
    this.showMap();
  }
});

async function createMap(platform, map, choices) {
    const datas = await getDatas(choices);
    const transportType = choices.typeDeplacement;
    await calculateRouteFromAtoB(platform, map, datas.data.Depart, datas.data.Arrivee, datas.data.POI, transportType);
}

async function getDatas(choices) {
    const origin = choices.path.depart;
    const destination = choices.path.arrivee;

    const typeDeplacement = choices.typeDeplacement;
    const theme = choices.theme

    const salleSport = choices.lieux.salleDeSport;
    const bar = choices.lieux.bar;
    const boulangerie = choices.lieux.boulangerie;
    const pharmacie = choices.lieux.pharmacie;
    return  http.get(`/boulot-b/trajet/${origin}/${destination}/${typeDeplacement}/${theme}/${salleSport}/${bar}/${boulangerie}/${pharmacie}`);
}

function calculateRouteFromAtoB (platform, map, origin, destination, stops, transportType) {
  const coordOrigin = origin[0] + ',' + origin[1];
  const coordDestination = destination[0] + ',' + destination[1];
  const coordStops = stops.map((object) => {
    return Object.values(object)[0].coordonnees['lat'] + ',' + Object.values(object)[0].coordonnees['lng']
  });
  const router = platform.getRoutingService(null, 8),
      routeRequestParams = {
        routingMode: 'fast',
        transportMode: transportType,
        origin: coordOrigin, 
        destination: coordDestination,  
        via: new H.service.Url.MultiValueQueryParameter(coordStops),
        return: 'polyline,travelSummary'
      };

  router.calculateRoute(
    routeRequestParams,
    (result) => onSuccess(result, map, origin, destination, stops),
    (error) => {
      alert('Can\'t reach the remote server');
    }
  );
}

function onSuccess(result, map, origin, destination, stops) {
  const route = result.routes[0];
  addRouteShapeToMap(route, map, origin, destination, stops);
}

async function addRouteShapeToMap(route, map, origin, destination, stops){
  route.sections.forEach((section) => {
    // decode LineString from the flexible polyline
    const linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
    // Create a polyline to display the route:
    const polyline = new H.map.Polyline(linestring, {
      style: {
        lineWidth: 4,
        strokeColor: 'rgba(255, 219, 39, 1)'
      }
    });
    // Add the polyline to the map
    map.addObject(polyline);
  });
  await addMarkers(map, origin, destination, stops);
}

async function addMarkers(map, origin, destination, stops) {
  const iconOrigin = await createIcon('origin.svg');
  const iconDestination = await createIcon('destination.svg')

  const markerOrigin = new H.map.DomMarker({lat: origin[0], lng: origin[1]}, {icon: iconOrigin});
  const markerDestination = new H.map.DomMarker({lat: destination[0], lng: destination[1]}, {icon: iconDestination});
  
  map.addObject(markerOrigin);
  map.addObject(markerDestination);

  for (let i=0 ; i < stops.length; i++) {
    const icon = await createIntermediaryIcon(Object.keys(stops[i])[0]);
    const markerStop = new H.map.DomMarker({lat: Object.values(stops[i])[0].coordonnees['lat'], lng: Object.values(stops[i])[0].coordonnees['lng']}, {icon: icon});
    map.addObject(markerStop);
  }
}

async function createIcon(img) {
    const image = document.createElement('img');
    image.src = img
    image.width = 20;
    image.height = 20;
    return new H.map.DomIcon(image);
  }

async function createIntermediaryIcon(namePOI) {
  switch(namePOI) {
    case 'Boulangerie':
      return await createIcon(baguette);
    case 'SalleSport':
      return await createIcon(haltere);
    case 'Bar':
      return await createIcon(verre);
    case 'Pharmacie':
      return await createIcon(medicament);
    default:
      return await createIcon(point);
  }
}
</script>

<style scoped>

  #mapContainer {
    display: block;
    position: relative;
    width: 100%;
    height: 500px;
  }
</style>