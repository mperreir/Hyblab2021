<template>
  <div id="map">
    <div id="mapContainer" ref="mapCont"></div>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import axios from 'axios'

export default Vue.component("finalMap", {
  name: "finalMap",
  methods: { async showMap() {
    var platform = new H.service.Platform({
      apikey: 'joMJEQ1I4K91vF4CAijYMD-cvtabfFAY-iHttZRSnto'
    });
    var defaultLayers = platform.createDefaultLayers();

    var map = new H.Map(this.$refs.mapCont,
    defaultLayers.vector.normal.map,{
    center: {lat:47.218371, lng:-1.553621},
    zoom: 12,
    pixelRatio: window.devicePixelRatio || 1
    });

    window.addEventListener('resize', () => map.getViewPort().resize());
    
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    const choices = this.$root.$data.getChoices();
    console.log(choices);
    console.log(choices.path)
    console.log(choices.path.depart)
    console.log(choices.path.arrivee)

    await createMap(platform, map, choices);
    }
  },
  mounted: function () {
    this.showMap();
  }
});

async function createMap(platform, map, choices) {
    // STYLE MAP
    // var provider = map.getBaseLayer().getProvider();
    // var style = new H.map.Style("../assets/map/wazo_map.yaml",
    // 'https://js.api.here.com/v3/3.1/styles/omv/');
    // provider.setStyle(style);

    
    const datas = await getDatas(choices);

    const transportType = (choices.typeDeplacement === 'pied' ? 'pedestrian' : 'bicycle');

    //const coordStopsList = [['47.217371', '-1.573621']]
    //if (this.transportType == 'velo') { transportType = 'bicycle' }
  
    //const coordStops = coordStopsList.map(coords => coords[0] + "," + coords[1])

    console.log("origin");
    console.log(origin);
    console.log(datas.data.Depart)

    // const depart = ['47.218371', '-1.553621'];
    // const arrivee = ['47.217371', '-1.593621'];

    await calculateRouteFromAtoB(platform, map, datas.data.Depart, datas.data.Arrivee, datas.data.POI, transportType);
}

async function getDatas(choices) {
    const origin = choices.path.depart;
    const destination = choices.path.arrivee;
    // const origin = "57 Rue Général Buat, 44000 Nantes";
    // const destination = "2 Rue Saint-Stanislas, 44000 Nantes";

    const typeDeplacement = (choices.typeDeplacement === "velo" ? "bicycle" : "pedestrian");
    //const style = (choices.style === "boulevards" ? "boullevards" : "ruelles");
    let theme = "alea";
    switch (choices.theme) {
        case "nature":
            theme = "nature";
        case "culture":
            theme = "culture";
    }

    console.log('VALEURS DES LIEUX PAR DEFAUT');
    const salleSport = false;
    const bar = true;
    const boulangerie = false;
    const pharmacie = true;
    // const salleSport = (choices.lieux.includes());
    // const bar = (choices.lieux.includes());
    // const boulangerie = (choices.lieux.includes());
    // const pharmacie = (choices.lieux.includes());
    console.log('Requête get');
    console.log(`/boulot-b/trajet/${origin}/${destination}/${typeDeplacement}/${theme}/${salleSport}/${bar}/${boulangerie}/${pharmacie}`);
    const res = await axios.get(`/boulot-b/trajet/${origin}/${destination}/${typeDeplacement}/${theme}/${salleSport}/${bar}/${boulangerie}/${pharmacie}`);
    console.log('res')
    console.log(res)
    return res;
}

function calculateRouteFromAtoB (platform, map, origin, destination, stops, transportType) {
  const coordOrigin = origin[0] + ',' + origin[1];
  const coordDestination = destination[0] + ',' + destination[1];
  
  console.log('stops')
  console.log(stops)
  const coordStops = stops.map((object) => {
    console.log(object)
    console.log(Object.values(object))
    return Object.values(object)[0].coordonnees['lat'] + ',' + Object.values(object)[0].coordonnees['lng']
  });
  console.log('coordStop')
  console.log(coordStops);

  var router = platform.getRoutingService(null, 8),
      routeRequestParams = {
        routingMode: 'fast',
        transportMode: transportType,
        origin: coordOrigin, 
        destination: coordDestination,  
        via: new H.service.Url.MultiValueQueryParameter(coordStops),
        return: 'polyline,travelSummary'
      };

  console.log(router)

  router.calculateRoute(
    routeRequestParams,
    (result) => onSuccess(result, map, origin, destination, stops),
    onError
  );
}

function onSuccess(result, map, origin, destination, stops) {
  var route = result.routes[0];
  addRouteShapeToMap(route, map, origin, destination, stops);
  //addManueversToMap(route);
  //addManueversToPanel(route);
  //addSummaryToPanel(route);
}

function onError(error) {
  alert('Can\'t reach the remote server');
}

async function addRouteShapeToMap(route, map, origin, destination, stops){
  console.log(route);
  console.log(map);
  console.log(origin);
  console.log(destination);
  route.sections.forEach((section) => {
    // decode LineString from the flexible polyline
    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

    // Create a polyline to display the route:
    let polyline = new H.map.Polyline(linestring, {
      style: {
        lineWidth: 4,
        strokeColor: 'rgba(255, 219, 39, 1)'
      }
    });

    // Add the polyline to the map
    map.addObject(polyline);
    // And zoom to its bounding rectangle
    // map.getViewModel().setLookAtData({
    //   bounds: polyline.getBoundingBox()
    // });
  });
  const point = await createImage('point.png')
  const iconPoint = new H.map.DomIcon(point);

  const imageOrigin = await createImage('origin.png');
  const iconOrigin = new H.map.DomIcon(imageOrigin);

  const imageDestination = await createImage('destination.png');
  const iconDestination = new H.map.DomIcon(imageDestination);

  const coordsOrigin = {lat: origin[0], lng: origin[1]};
  const coordsDestination = {lat: destination[0], lng: destination[1]};
  const coordStops = stops.map((object) => {
    return [Object.values(object)[0].coordonnees['lat'], Object.values(object)[0].coordonnees['lng']]
  });

  console.log(coordStops[0])

  const markerOrigin = new H.map.DomMarker(coordsOrigin, {icon: iconOrigin});
  const markerDestination = new H.map.DomMarker(coordsDestination, {icon: iconDestination});
  
  map.addObject(markerOrigin);
  map.addObject(markerDestination);

  for (let i=0 ; i < coordStops.length; i++) {
    const markerStop = new H.map.DomMarker({lat: coordStops[i][0], lng: coordStops[i][1]}, {icon: iconPoint});
    map.addObject(markerStop);
  }
  
  

  async function createImage(imageName) {
    console.log('Requête image')
    console.log('/boulot-b/getUrlImage/' + imageName)
    const reqUrlImage = await axios.get(`/boulot-b/getUrlImage/${imageName}`);
    const imagePoint = document.createElement('img');
    //console.log(reqUrlImage.data.urlImage);
    imagePoint.src = reqUrlImage.data.urlImage;
    imagePoint.width = 10;
    imagePoint.height = 10;
    return imagePoint;
  }

  // async function showTrajet() {
  //   console.log('début promesse et requete get')
  //   const res = await axios.get('/boulot-b/trajet/3+rue+christian+pauc+nantes/7+rue+george+berthome+nantes/pedestrian/nature/false/false/true/false')
  //   console.log(res)
  // }
}

</script>

<style scoped>
  #map {
    display: flex;
    position: relative;

    left: 30%;
    width: 900px;
    height: 600px;
  }

  #mapContainer {
    display: block;
    position: relative;

    width: 700px;
    height: 500px;
  }
</style>