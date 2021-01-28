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
    center: {lat:52.5160, lng:13.3779},
    zoom: 13,
    pixelRatio: window.devicePixelRatio || 1
    });
    window.addEventListener('resize', () => map.getViewPort().resize());

    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers);

    // Hold a reference to any infobubble opened
    var bubble;
  }
});

// function calculateRouteFromAtoB (platform) {
//   var router = platform.getRoutingService(null, 8),
//       routeRequestParams = {
//         routingMode: 'fast',
//         transportMode: 'pedestrian',
//         origin: '51.51326,-0.0968752', // St Paul's Cathedral
//         destination: '51.5081,-0.0985',  // Tate Modern
//         via:'51.51148,-0.09627', // point intermédiaire random
//         return: 'polyline,travelSummary'
//       };


//   router.calculateRoute(
//     routeRequestParams,
//     onSuccess,
//     onError
//   );
// }

// function onSuccess(result) {
//   var route = result.routes[0];
//  /*
//   * The styling of the route response on the map is entirely under the developer's control.
//   * A representitive styling can be found the full JS + HTML code of this example
//   * in the functions below:
//   */
//   //addRouteShapeToMap(route);
//   //addManueversToMap(route);
//   //addManueversToPanel(route);
//   //addSummaryToPanel(route);
//   // ... etc.
// }

   
// fetch('https://js.api.here.com/v3/3.1/mapsjs-core.js')
// fetch('https://js.api.here.com/v3/3.1/mapsjs-service.js')
// fetch('https://js.api.here.com/v3/3.1/mapsjs-ui.js')
// fetch('https://js.api.here.com/v3/3.1/mapsjs-mapevents.js')

// var platform = new H.service.Platform({
//   apikey: 'joMJEQ1I4K91vF4CAijYMD-cvtabfFAY-iHttZRSnto'
// });
// var defaultLayers = platform.createDefaultLayers();

// function onError(error) {
//   alert('Can\'t reach the remote server');
// }

// var map = new H.Map(domMap,
//   defaultLayers.vector.normal.map,{
//   center: {lat:52.5160, lng:13.3779},
//   zoom: 13,
//   pixelRatio: window.devicePixelRatio || 1
// });
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