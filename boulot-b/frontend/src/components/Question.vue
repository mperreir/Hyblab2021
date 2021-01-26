<template>
  <fil-conducteur v-bind:actif="2"/>
</template>

<script>
import Vue from "vue";
import FilConducteur from "@/components/FilConducteur.vue";
export default Vue.extend({
  name: "question",
  components: {
    FilConducteur,
  },
  data() {
    return {
      component: "Nav",
    };
  },
  // methods: {
  //   back_home() {
  //     this.$emit("switch-component");
  //   },
  // },
});
</script>

<style scoped>
</style>
