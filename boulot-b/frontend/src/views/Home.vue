<template>
  <component @switch-component="switchComponent" :is="component"></component>
</template>

<script>
import Vue from "vue";

import PointDeDepart from "../components/PointDeDepart";
import Question from "../components/Question";
import Oiseau from "../components/Oiseau";


export default Vue.extend({
  name: "Home",
  components: {
    PointDeDepart,
    
    Question,
    Oiseau,

  },
  data() {
    return {
      // component: "PointDeDepart",
      component: "Oiseau",

    };
  },
  methods: {
    switchComponent(component = "PointDeDepart") {
      this.component = component;
    },
  },
});


</script>
