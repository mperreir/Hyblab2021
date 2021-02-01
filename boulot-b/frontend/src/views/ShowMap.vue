<template>
  <container>
    <template #question>
      <finalMap />
    </template>
    <template #stepper>
      <Stepper :actif=actif />
    </template>
  </container>
</template>

<script lang="js">
import Vue from "vue";
import FinalMap from "../components/FinalMap.vue";
import Container from "@/views/Container";
import Stepper from "@/components/Stepper";

export default Vue.extend({
    name: "Home",
    components: {
      Container,
      FinalMap,
      Stepper,
    },
    props: {
      actif: Number
    }
});


</script>

<style scoped>

</style>