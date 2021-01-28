<template>
  <div id="map">
    <div id="mapContainer" ref="mapCont"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.component("finalMap", {
  name: "finalMap",
  props: ['origin', 'destination', 'stops', 'transportType'],
  mounted: function () {
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

    // STYLE MAP
    // var provider = map.getBaseLayer().getProvider();
    // var style = new H.map.Style("../assets/map/wazo_map.yaml",
    // 'https://js.api.here.com/v3/3.1/styles/omv/');
    // provider.setStyle(style);
    
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    let transportType = 'pedestrian';
    if (this.transportType == 'bicycle') { transportType = 'bicycle' }
  
    const coordStops = this.stops.map(coords => coords[0] + "," + coords[1])

    calculateRouteFromAtoB(platform, map, this.origin, this.destination, coordStops, transportType);
  }
});

function calculateRouteFromAtoB (platform, map, origin, destination, coordStops, transportType) {
  const coordOrigin = origin[0] + ',' + origin[1];
  const coordDestination = destination[0] + ',' + destination[1];
  
  var router = platform.getRoutingService(null, 8),
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
    (result) => onSuccess(result, map, origin, destination),
    onError
  );
}

function onSuccess(result, map, origin, destination) {
  var route = result.routes[0];
 /*
  * The styling of the route response on the map is entirely under the developer's control.
  * A representitive styling can be found the full JS + HTML code of this example
  * in the functions below:
  */
  addRouteShapeToMap(route, map, origin, destination);
  //addManueversToMap(route);
  //addManueversToPanel(route);
  //addSummaryToPanel(route);
  // ... etc.
}

function onError(error) {
  alert('Can\'t reach the remote server');
}

function addRouteShapeToMap(route, map, origin, destination){
  route.sections.forEach((section) => {
    // decode LineString from the flexible polyline
    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

    // Create a polyline to display the route:
    let polyline = new H.map.Polyline(linestring, {
      style: {
        lineWidth: 4,
        //strokeColor: 'rgba(231, 240, 13, 0.7)'
        strokeColor: 'rgba(0, 0, 0, 1)'
      }
    });

    // Add the polyline to the map
    map.addObject(polyline);
    // And zoom to its bounding rectangle
    // map.getViewModel().setLookAtData({
    //   bounds: polyline.getBoundingBox()
    // });
  });
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