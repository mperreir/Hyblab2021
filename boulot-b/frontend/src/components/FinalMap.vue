<template>
  <div id="map">
    <div  id="mapContainer" ref="mapCont"></div>
    <div id="textMap" ref="textMap"></div>
    <ButtonCustom  @click="credits" text="Crédits" color="yellow"/>
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
import origin from '@/assets/map/origin.svg'
import ButtonCustom from "@/components/ButtonCustom";


export default Vue.component("finalMap", {
  name: "finalMap",
  components: {
    ButtonCustom
  },
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
      await createMap(platform, map, this.$root.$data.getChoices(), this.$root.$data.state.trajetData, this.$refs.textMap)
    },
    credits() {
      this.next();
    },
  },
  mounted: function () {
    this.showMap();
  }
});

async function createMap(platform, map, choices, data, divMap) {
    const transportType = choices.typeDeplacement;
    await calculateRouteFromAtoB(platform, map, data.Depart, data.Arrivee, data.POI, transportType, divMap);
}

function calculateRouteFromAtoB (platform, map, origin, destination, stops, transportType, divMap) {
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
      addRouteShapeToMap(route, map, origin, destination, stops, divMap);
    },
    (error) => {
      console.log('Can\'t reach the remote server', error);
    }
  );
}

async function addRouteShapeToMap(route, map, origin, destination, stops, divMap){
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
  await addMarkers(map, origin, destination, stops, divMap);
}

async function addMarkers(map, origin, destination, stops, divMap) {
  const iconOrigin = await iconFactory({name: 'Origine', datas: {}}, divMap)
  const iconDestination = await iconFactory({name: 'Destination', datas: {}}, divMap)

  const markerOrigin = new H.map.DomMarker({lat: origin[0], lng: origin[1]}, {icon: iconOrigin});
  const markerDestination = new H.map.DomMarker({lat: destination[0], lng: destination[1]}, {icon: iconDestination});

  map.addObject(markerOrigin);
  map.addObject(markerDestination);

  console.log('stops');
  console.log(stops)

  for (let i=0 ; i < stops.length; i++) {
    const icon = await iconFactory({name: Object.keys(stops[i])[0], datas: Object.values(stops[i])[0]}, divMap);
    const markerStop = new H.map.DomMarker({lat: Object.values(stops[i])[0].coordonnees['lat'], lng: Object.values(stops[i])[0].coordonnees['lng']}, {icon: icon});
    map.addObject(markerStop);
  }
}


function iconFactory(namePOI, divMap) {
  console.log(namePOI)
  console.log('ref div')
  console.log(divMap)
  function createIcon(img, divMap, width = 20, height = 20) {
    const image = document.createElement('img');
    image.src = img
    image.width = width;
    image.height = height;
    console.log('ref div ic')
    console.log(divMap)
    return new H.map.DomIcon(image, {
      onAttach: function(clonedElement, domIcon, domMarker) {
        console.log(clonedElement)
        console.log(domIcon)
        console.log(domMarker)
        console.log('good div')
        console.log(divMap)
        clonedElement.addEventListener('mouseover', (evt) => showDescription(evt, divMap, namePOI));
        clonedElement.addEventListener('mouseout', (evt) => deleteDescription(evt, divMap, namePOI));
      },
      // onDetach: function(ClonedElement, domIcon, domMarker) {
      //   clonedElement.addEventListener('mouseover', (evt) => changeOpacity(evt, 1));
      // }
    });
  }

  function createElementP() {
    const p = document.createElement('p');
    return p;
  }

  function showDescription(evt, divMap, namePOI) {
    if (namePOI.name !== 'Origine' && namePOI.name !== 'Destination') {
      evt.target.style.opacity = 0.5;

      console.log(namePOI);

      let group = document.createElement('div');

      const title = document.createElement('p');
      const address = document.createElement('p');
      const phone = document.createElement('p');
      const description = document.createElement('p');
      const streetView = document.createElement('p');

      title.appendChild(document.createTextNode(namePOI.datas.titre));
      address.appendChild(document.createTextNode(namePOI.datas.adresse));
      phone.appendChild(document.createTextNode(namePOI.datas.contact));
      description.appendChild(document.createTextNode(namePOI.datas.description));
      streetView.appendChild(document.createTextNode(namePOI.datas.streetView));

      group.appendChild(title);
      group.appendChild(address);
      group.appendChild(phone);
      group.appendChild(description);
      group.appendChild(streetView);

      divMap.appendChild(group);
    }
  }

  function deleteDescription(evt, divMap, namePOI) {
    if (namePOI.name !== 'Origine' && namePOI.name !== 'Destination') {
      evt.target.style.opacity = 1;
      divMap.removeChild(divMap.lastChild)
    }
  }

  switch(namePOI.name) {
    case 'Boulangerie':
      return createIcon(baguette, divMap);
    case 'SalleSport':
      return createIcon(haltere, divMap);
    case 'Bar':
      return createIcon(verre, divMap, 10, 20);
    case 'Pharmacie':
      return createIcon(medicament, divMap);
    case 'Origine':
      return createIcon(origin, divMap);
    case "Destination":
      return createIcon(destination, divMap);
    default:
      return createIcon(point, divMap);
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

  #textMap {
    display: block;
    width: 100%;
    height: 50px;
  }

</style>