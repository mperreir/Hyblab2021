<template>
  <component @switch-component="switchComponent" :is="component"></component>
</template>

<script>
import Vue from "vue";
import PointDeDepart from "@/components/PointDeDepart.vue";
import Question from "@/components/Question.vue";
import Nav from "@/components/FilConducteur.vue";

export default Vue.extend({
  name: "Home",
  components: {
    PointDeDepart,
    Question,
    Nav,
  },
  data() {
    return {
      component: "PointDeDepart",
    };
  },
  methods: {
    switchComponent(component = "PointDeDepart") {
      this.component = component;
    },
  },
});
</script>
