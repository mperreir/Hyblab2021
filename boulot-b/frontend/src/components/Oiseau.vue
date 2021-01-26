<template>


<!-- <lottie-animation
    path="/assets/animationJson/wazo_culture.json"
/> -->
<div id="wazo-anim" style=" width: 20%;
 "></div>


</template>


<script >
import lottie from "lottie-web";
   const animationData = () => import("../assets/animationJson/wazo_culture.json");

export default {
  name: "Oiseau",
  props :['anim'], // on change l'anim en fonction de l'écran/ choix faits / remplace l'import.
        mounted () {
        animationData().then(function(data) { // data contient les données du json
        lottie.loadAnimation({
        container : document.getElementById('wazo-anim'), 
        renderer: 'svg',
        loop: true,
        direction: -1,
        autoplay: true,
        animationData: data.default // the path to the animation json
          })
        });
      }
};
</script>