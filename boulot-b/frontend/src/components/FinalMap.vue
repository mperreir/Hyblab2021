<template>
  <div id="map">
    <div id="mapContainer" ref="mapCont"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.component("finalMap", {
  name: "finalMap",
  mounted: function () {
    console.log(this.$refs.mapCont)

    var platform = new H.service.Platform({
      apikey: 'joMJEQ1I4K91vF4CAijYMD-cvtabfFAY-iHttZRSnto'
    });
    var defaultLayers = platform.createDefaultLayers();

    var map = new H.Map(this.$refs.mapCont,
    defaultLayers.vector.normal.map,{
    center: {lat:47.218371, lng:-1.553621},
    zoom: 13,
    pixelRatio: window.devicePixelRatio || 1
    });
    window.addEventListener('resize', () => map.getViewPort().resize());

    
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    calculateRouteFromAtoB(platform, map);
  }
});

function calculateRouteFromAtoB (platform, map) {
  var router = platform.getRoutingService(null, 8),
      routeRequestParams = {
        routingMode: 'fast',
        transportMode: 'pedestrian',
        origin: '51.51326,-0.0968752', // St Paul's Cathedral
        destination: '51.5081,-0.0985',  // Tate Modern
        via:'51.51148,-0.09627', // point intermédiaire random
        return: 'polyline,travelSummary'
      };


  router.calculateRoute(
    routeRequestParams,
    (result) => onSuccess(result, map),
    onError
  );
}

function onSuccess(result, map) {
  console.log(result)
  var route = result.routes[0];
 /*
  * The styling of the route response on the map is entirely under the developer's control.
  * A representitive styling can be found the full JS + HTML code of this example
  * in the functions below:
  */
  addRouteShapeToMap(route, map);
  //addManueversToMap(route);
  //addManueversToPanel(route);
  //addSummaryToPanel(route);
  // ... etc.
}

function onError(error) {
  alert('Can\'t reach the remote server');
}

function addRouteShapeToMap(route, map){
  route.sections.forEach((section) => {
    // decode LineString from the flexible polyline
    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

    // Create a polyline to display the route:
    let polyline = new H.map.Polyline(linestring, {
      style: {
        lineWidth: 4,
        strokeColor: 'rgba(0, 128, 255, 0.7)'
      }
    });

    // Add the polyline to the map
    map.addObject(polyline);
    // And zoom to its bounding rectangle
    map.getViewModel().setLookAtData({
      bounds: polyline.getBoundingBox()
    });
  });
}

</script>

<style scoped>
  #map {
    display: flex;
    position: relative;

    left: 30%;
    width: 700px;
    height: 400px;
  }

  #mapContainer {
    display: block;
    position: relative;

    width: 500px;
    height: 300px;
  }
</style>