<template>
  <keep-alive>
    <transition :name="transition" mode="out-in">
      <component  :actif="actif" :is="view"></component>
    </transition>
  </keep-alive>
</template>

<script>
import ChoixDestination from "@/views/ChoixDestination";
import ChoixTheme from "@/views/ChoixTheme";
import ChoixTypeDeplacement from "@/views/ChoixTypeDeplacement";
import ChoixHumeur from "@/views/ChoixHumeur";
import ChoixStyle from "@/views/ChoixStyle";
import ChoixLieux from "@/views/ChoixLieux";
import ShowMap from "@/views/ShowMap";
import Credits from "@/views/Credits";
import {routes} from "@/router";

const Views = [
  {actif: 0, component: ChoixDestination},
  {actif: 1, component: ChoixTypeDeplacement},
  {actif: 2, component: ChoixHumeur},
  {actif: 3, component: ChoixStyle},
  {actif: 4, component: ChoixTheme},
  {actif: 5, component: ChoixLieux},
  {actif: 6, component: ShowMap},
  {actif: 7, component: Credits}
]

export default {
  name: "QuestionnaireContainer",
  data() {
    return {
      transition: "slide_bas",
      actif: 0,
      view: ChoixDestination
    }
  },
  mounted() {
    this.$root.$data.subscribe("actif", (nextActif) => {
      this.transition =  nextActif < this.actif ?  "slide_haut" : "slide_bas"
      this.actif = nextActif
      const indexView = Views.findIndex((view) => view.actif === this.actif)
      this.view = Views[indexView]?.component
      Views.forEach((view) => {
        if (view.actif >= this.actif){
          this.$root.$data.clearChoice(view.component.choice)
        }
      })
    })
  },
}
</script>

<style scoped>
  .slide_bas-enter {
    transform: translateY(100%);
  }
  .slide_bas-enter-to {
    transform: translateY(0);
  }
  .slide_bas-enter-active {
    position: absolute;
  }
  .slide_bas-leave {
    transform: translateY(0);
  }
  .slide_bas-leave-to {
    transform: translateY(-100%);
  }
  .slide_bas-enter-active, .slide_bas-leave-active {
    transition: all 1s ease-in;
  }

  .slide_haut-enter {
    transform: translateY(-100%);
  }
  .slide_haut-enter-to {
    transform: translateY(0);
  }
  .slide_haut-enter-active {
    position: absolute;
  }
  .slide_haut-leave {
    transform: translateY(0);
  }
  .slide_haut-leave-to {
    transform: translateY(100%);
  }
  .slide_haut-enter-active, .slide_haut-leave-active {
    transition: all 1s ease-in;
  }

</style>