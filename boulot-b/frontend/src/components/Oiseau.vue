<template>


<div style="position:absolute; left:40%" >
    <div id="bulle-group" style="position:relative;width: 300px;" >  
     

    <img src="../assets/bulle/bulle4x.png" style="position:relative; width:100%">
    <img src="../assets/bulle/fleche4x.png" style="position:absolute;  left : 60% ; top: 70%  ;width:40%;">

    
      <div class="centered" style="position: absolute;  top: 40%;  left: 50%;  transform: translate(-50%, -50%); width: 250px; height: 100px; word-wrap: break-word ">
        <p style="   font-family: Poppins;
font-size: 15px;
font-style: normal;
font-weight: 600;
line-height: 30px;
letter-spacing: 0em;
text-align: left;
">{{message}}
          </p>
    </div>
  </div>
<div id="wazo-anim" style="position:relative; width: 20%; left:30%">
  </div>


</div>


</template>


<script >
import lottie from "lottie-web";
   const animationData = () => import("../assets/animationJson/wazo_culture.json");

export default {
  name: "Oiseau",
  // props :['anim','messaage'], // on change l'anim en fonction de l'écran/ choix faits / remplace l'import.

  data: function(){
    return {
      message:"salut  ",
      anim:"../assets/animationJson/wazo_culture.json"
    }
  },
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