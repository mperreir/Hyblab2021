<template>
  <button @click="launch"> clique</button>
</template>

<script lang="ts">
import Vue from "vue";
import ChoixTypeDeplacement from "./ChoixTypeDeplacement";

export default Vue.extend({
  name: "Home",
  components: {
    ChoixTypeDeplacement
  },
  methods: {
    launch() {
      this.$router.push({name:"type-destination"})
    }
  }
});
</script>
