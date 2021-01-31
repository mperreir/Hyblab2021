<template>
  <div>
    <finalMap v-bind:origin="['47.218371', '-1.553621']" v-bind:destination="['47.217371', '-1.593621']" v-bind:stops="[['47.217371', '-1.573621']]" v-bind:transportType="'pedestrian'"></finalMap>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import FinalMap from "../components/FinalMap.vue";

export default Vue.extend({
  name: "Home",
  components: {
    FinalMap
  },
});
</script>