<template>
  <keep-alive>
    <transition name="slide" mode="out-in">
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
      actif: 0,
      view: ChoixDestination
    }
  },
  mounted() {
    this.$root.$data.subscribe("actif", (nextActif) => {
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
  .slide-enter {
    transform: translateY(100%);
  }
  .slide-enter-to {
    transform: translateY(0);
  }
  .slide-enter-active {
    position: absolute;
  }
  .slide-leave {
    transform: translateY(0);
  }
  .slide-leave-to {
    transform: translateY(-100%);
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 1s ease-in;
  }
</style>