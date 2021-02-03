<template>
  <div>
    <finalMap />
    <img @click="backHome" class="wazo_icon" src="@/assets/wazzo.svg"/>
        <Stepper class="stepper" color="blue"  :actif=actif />
      <ButtonCustom class="credit"  @click="credits" text="Crédits" color="dark-blue"/>
  </div>
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
      backHome() {
        this.$root.$data.setActif(0)
      },
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
.wazo_icon {
  cursor: pointer;
  margin-left: 100px;
  margin-top: 40px;
  z-index: 12;
  position:absolute;
  margin-right: 10px;
  top: 0;
  left: 0;
}

.stepper {
  position:absolute;
  bottom:0;
  left:0;
}
.credit {
  position:absolute;
  bottom:0;
  right:0;
}

</style>