<template>
  <div >
    <transition name="fade" mode="out-in">
      <div class="bubble" :key="message">
          <p class="text" >{{message}} </p>
      </div>
    </transition>
    <div id="wazo-anim"  > </div>
  </div>
</template>


<script >
import lottie from "lottie-web";
import {Humeur, Themes} from "@/store";

import canariVanilla from "../assets/animationJson/wazo_vanilla_gauche.json";
import canariCulture from "../assets/animationJson/wazo_culture.json";
import canariSport from "../assets/animationJson/wazo_sport";
import canariCultureSport from "../assets/animationJson/wazo_culture_sport.json";
import canariSportNature from "../assets/animationJson/wazo_sport_nature.json";
import canariNature from "../assets/animationJson/wazo_nature.json";

export default {
  name: "Oiseau",
  props: {
    message: String,
    anim: {
      default: () => canariVanilla
    }
  },  
  data() {
    let choixhumeur =this.$root.$data.state.choice.humeur;
    let choixtheme = this.$root.$data.state.choice.theme;
          if(choixhumeur === Humeur.OUI || choixhumeur === Humeur.PLUTOT ){
            if( choixtheme === Themes.NATURE ){
                return{animm : canariSportNature } 
            }
            else if (choixtheme === Themes.CULTURE ){
                return{animm : canariCultureSport } 
            }
          return{animm : canariSport } 
          }  else{
              if( choixtheme === Themes.NATURE ){
                return{animm : canariNature } 
            }
            else if (choixtheme === Themes.CULTURE ){
                return{animm : canariCulture } 
            }else{
              return{animm : canariVanilla }
            }
          }
  },
    
    
    mounted () {
    lottie.loadAnimation({
    container : document.getElementById('wazo-anim'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: this.animm, // par défaut
      })

    },

};
</script>

<style scoped lang="scss">
  $bulle: #139ee0;

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .text {
    font-family: Poppins,serif;
    font-size: 1.2em;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 0;
    text-align: center;
  }
  #wazo-anim {
    width: 200px;
  }

  .bubble{
    background: $bulle;
    color:#fff;
    padding:5px 15px;
    border-radius: 50px;
    width:350px;
  }

  .bubble::after{
    content:"";
    border-left:20px solid transparent;
    border-right:20px solid transparent;
    border-top: 20px solid $bulle;
    margin-left: 100px;
    position: absolute;
  }

</style>

