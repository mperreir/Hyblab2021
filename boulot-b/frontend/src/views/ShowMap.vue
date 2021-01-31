<template>
  <div>
    <finalMap></finalMap>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import axios from 'axios'
import FinalMap from "../components/FinalMap.vue";

export default Vue.extend({
    name: "Home",
    components: {
    FinalMap
    },
});


</script>

<style scoped>

</style>