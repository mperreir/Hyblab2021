<template>
    <container>
      <template #question>
        <finalMap />
      </template>
      <template #stepper>
        <Stepper :actif=actif />
      </template>
      <ButtonCustom class="credit"  @click="credits" text="Crédits" color="yellow"/>
    </container>
</template>

<script lang="js">
import Vue from "vue";
import FinalMap from "../components/FinalMap.vue";
import Container from "@/views/Container";
import Stepper from "@/components/Stepper";
import ButtonCustom from "@/components/ButtonCustom";


export default Vue.extend({
    name: "Home",
    components: {
      Container,
      FinalMap,
      Stepper,
      ButtonCustom
    },
    props: {
      actif: Number
    },
    methods: {
      next() {
        this.$root.$data.setActif(this.actif +1)
      },
      credits() {
        this.next();
    },
  }
});


</script>

<style scoped>

.credit {
  position:absolute;
  bottom:0;
  right:0;
}

</style>