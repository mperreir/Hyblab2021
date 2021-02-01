<template>
  <div id="map">
    <div  id="mapContainer" ref="mapCont"></div>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import baguette from "@/assets/map/baguette.svg"
import haltere from "@/assets/map/haltere.svg"
import verre from "@/assets/map/verre.svg"
import medicament from '@/assets/map/medicament.svg'
import point from '@/assets/map/point.svg'
import destination from '@/assets/map/destination.svg'
import origin from '@/assets/map/origin.svg'


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
    // Permet le zoom
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      H.ui.UI.createDefault(map, defaultLayers);
      await createMap(platform, map, this.$root.$data.getChoices(), this.$root.$data.state.trajetData)
    }
  },
  mounted: function () {
    this.showMap();
  }
});

async function createMap(platform, map, choices, data) {
    const transportType = choices.typeDeplacement;
    await calculateRouteFromAtoB(platform, map, data.Depart, data.Arrivee, data.POI, transportType);
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
    (result) => {
      const route = result.routes[0];
      addRouteShapeToMap(route, map, origin, destination, stops);
    },
    (error) => {
      console.log('Can\'t reach the remote server', error);
    }
  );
}

async function addRouteShapeToMap(route, map, origin, destination, stops){
  route.sections.forEach((section) => {
    // decode LineString from the flexible polyline
    const linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
    // Create a polyline to display the route:
    const polyline = new H.map.Polyline(linestring, {
      style: {
        lineWidth: 4,
        strokeColor: 'rgba(0, 0, 0, 1)'
      }
    });
    // Add the polyline to the map
    map.addObject(polyline);
  });
  await addMarkers(map, origin, destination, stops);
}

async function addMarkers(map, origin, destination, stops) {
  const iconOrigin = await iconFactory('Origine')
  const iconDestination = await iconFactory('Destination')

  const markerOrigin = new H.map.DomMarker({lat: origin[0], lng: origin[1]}, {icon: iconOrigin});
  const markerDestination = new H.map.DomMarker({lat: destination[0], lng: destination[1]}, {icon: iconDestination});

  map.addObject(markerOrigin);
  map.addObject(markerDestination);

  for (let i=0 ; i < stops.length; i++) {
    const icon = await iconFactory(Object.keys(stops[i])[0]);
    const markerStop = new H.map.DomMarker({lat: Object.values(stops[i])[0].coordonnees['lat'], lng: Object.values(stops[i])[0].coordonnees['lng']}, {icon: icon});
    map.addObject(markerStop);
  }
}


function iconFactory(namePOI) {
  function createIcon(img) {
    const image = document.createElement('img');
    image.src = img
    image.width = 20;
    image.height = 20;
    return new H.map.DomIcon(image);
  }
  switch(namePOI) {
    case 'Boulangerie':
      return createIcon(baguette);
    case 'SalleSport':
      return createIcon(haltere);
    case 'Bar':
      return createIcon(verre);
    case 'Pharmacie':
      return createIcon(medicament);
    case 'Origine':
      return createIcon(origin);
    case "Destination":
      return createIcon(destination);
    default:
      return createIcon(point);
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