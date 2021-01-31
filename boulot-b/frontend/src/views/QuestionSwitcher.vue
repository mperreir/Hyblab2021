<template>
  <keep-alive>
    <transition name="fade" mode="out-in">
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
import {routes} from "@/router";

const Views = [
  {actif: 1, component: ChoixDestination},
  {actif: 2, component: ChoixTypeDeplacement},
  {actif: 3, component: ChoixHumeur},
  {actif: 4, component: ChoixStyle},
  {actif: 5, component: ChoixTheme},
  {actif: 6, component: ChoixLieux},
  {actif: 7, component: ShowMap},
]

export default {
  name: "QuestionnaireContainer",
  data() {
    return {
      actif: 1,
      view: ChoixDestination
    }
  },
  mounted() {
    this.$root.$data.subscribe("actif",(nextActif) => {
      this.actif = nextActif
      const indexView = Views.findIndex((view) => view.actif === this.actif)
      this.view = Views[indexView].component
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>