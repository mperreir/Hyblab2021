<template>
  <component @switch-component="switchComponent" :is="component"></component>
</template>

<script lang="ts">
import Vue from "vue";
import PointDeDepart from "@/components/PointDeDepart.vue";
import Question from "@/components/Question.vue";

export default Vue.extend({
  name: "Home",
  components: {
    PointDeDepart,
    Question,
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
