<template>
  <div id="map">
    <div  id="mapContainer" ref="mapCont"></div>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import baguette from "@/assets/map/baguette.svg"
import haltere from "@/assets/map/haltere.svg"
import verre from "@/assets/map/verre.png"
import medicament from '@/assets/map/medicament.svg'
import point from '@/assets/map/point.svg'
import destination from '@/assets/map/destination.svg'
import origine from '@/assets/map/origin.svg'
import parc from '@/assets/map/parc.svg'
import monument from '@/assets/map/monument.svg'


export default Vue.component("finalMap", {
  name: "finalMap",
  methods: {
      async showMap() {
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
      const ui = H.ui.UI.createDefault(map, defaultLayers);

      addOriginDestination(this.$root.$data.state.trajetData.Depart, this.$root.$data.state.trajetData.Arrivee, map);
      addInfoBubble(map, ui, this.$root.$data.state.trajetData)
      createMap(platform, map, this.$root.$data.getChoices(), this.$root.$data.state.trajetData)
    },
  },
  mounted: function () {
    this.showMap();
  }
});


function addOriginDestination(origin, destination, map) {
  const iconOrigin = iconFactory('Origine');
  const iconDestination = iconFactory('Destination')

  const markerOrigin = new H.map.Marker({lat: origin[0], lng: origin[1]}, {icon: iconOrigin});
  const markerDestination = new H.map.Marker({lat: destination[0], lng: destination[1]}, {icon: iconDestination});

  map.addObject(markerOrigin);
  map.addObject(markerDestination);
}

function addMarkerToGroup(group, coordinates, html, typePlace) {
  const imageIcon = iconFactory(typePlace);
  const marker = new H.map.Marker(coordinates, {icon: imageIcon});

  marker.setData(html);
  group.addObject(marker);
}

function createIcon(imageIcon, width = 30, height = 30) {
  const image = document.createElement('img');
  image.src = imageIcon;

  return new H.map.Icon(image, {size: {w: width, h: height}});
}

function iconFactory(typePlace) {
  switch (typePlace) {
    case 'Origine':
      return createIcon(origine);
    case "Destination":
      return createIcon(destination);
    case 'Boulangerie':
      return createIcon(baguette);
    case 'SalleSport':
      return createIcon(haltere);
    case 'Bar':
      return createIcon(verre, 20, 30);
    case 'Pharmacie':
      return createIcon(medicament);
    case 'Culture':
      return createIcon(monument);
    case 'Nature':
      return createIcon(parc, 35, 35);
    default:
      return createIcon(point);
  }
}

function addInfoBubble(map, ui, data) {
  const group = new H.map.Group();

  map.addObject(group);
  const stops = data.POI
  group.addEventListener('tap', function (evt) {
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    const bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
      content: evt.target.getData()
    });
    // show info bubble
    ui.addBubble(bubble);
  }, false);

  for (let i=0 ; i < stops.length; i++) {
    const lieu = Object.values(stops[i])[0]
    // add 'tap' event listener, that opens info bubble, to the group

    addMarkerToGroup(group, {lat: lieu.coordonnees.lat, lng: lieu.coordonnees.lng},
        "<p class='title' >"+ lieu.titre + "</p>  <p>"+ lieu.description + "</p>" +
          `<p> <a class='link' href='${lieu.streetView}'  target="_blank"> StreetView </a> </p> `, Object.keys(stops[i])[0])
  }
}

function createMap(platform, map, choices, data) {
  const provider = map.getBaseLayer().getProvider();
  const base = process.env.NODE_ENV === "development" ? "http://localhost:8080"  : origin
  const style = new H.map.Style(base + '/nantes2021/boulot-b/styles/normal.day.yaml');
  provider.setStyle(style);
  const transportType = choices.typeDeplacement;
  calculateRouteFromAtoB(platform, map, data.Depart, data.Arrivee, data.POI, transportType);
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
        strokeColor: 'rgba(16, 87, EB, 1)'
      }
    });
    // Add the polyline to the map
    map.addObject(polyline);
  });
}
</script>

<style >

  #mapContainer {
    z-index: 0;
    display: block;
    position: relative;
    width: 100%;
    height: 100vh;
    cursor: url("~@/assets/mouse.png") 16 16, auto;
  }

  .H_ib_content {
    color: white ;
    font-size: 12px;
    line-height: 1.5;
  }

  .title {
    font-weight: bold;
  }

  .H_ib_body {
    background: #ffdb27;
    width: 250px;
    position: absolute;
    right: -100px;
    border-radius: 20px;
    box-shadow: 0px 0 4px 0 rgba(15, 22, 33, 0.6);
  }

  .link {
    color: white;
    text-decoration: none;
  }

  #textMap {
    display: block;
    width: 100%;
    height: 100px;
  }

</style>