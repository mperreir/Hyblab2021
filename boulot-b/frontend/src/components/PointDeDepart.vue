<template>
  <div>
    <input id="départ" placeholder="point de départ" />
    <input id="arrivé" placeholder="point d'arrivé" />
    <button @click="launch">C'est parti !</button>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "PointDeDepart",
  methods: {
    launch() {
      this.$emit("switch-component", "Nav");
    },
  },
});
</script>

<style scoped>
</style>
