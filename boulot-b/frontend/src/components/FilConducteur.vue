<template>
  <div id="nav">
    <img @click="back_home" id="home" src="@/assets/home.svg" alt="home" title="Home"/>
    <img id="bar" src="@/assets/bar.svg" alt="bar">
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Nav",
  methods: {
    back_home() {
      this.$emit("switch-component", "PointDeDepart");
    },
  },
});
</script>

<style scoped>
    #nav {
        display: flex;
        width: 350px;
        align-content: center;
    }
    #home {
        cursor: pointer;
        margin: 10px;
    }
    #bar {
        margin: 20px;
    }
</style>