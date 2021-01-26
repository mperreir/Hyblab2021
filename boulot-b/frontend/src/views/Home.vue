<template>
  <div id="container">
    <div id="canari">
      <Oiseau/>
    </div>
    <div id="launcher">
      <Input class="depart" placeholder="point de départ..." />
      <Input class="arrive" placeholder="point d'arrivée..." />
      <ButtonCustom @click="launch" text="C'est partie !" color="blue" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ChoixTypeDeplacement from "./ChoixTypeDeplacement";
import Input from "../components/Input.vue";
import ButtonCustom from "../components/ButtonCustom.vue";
import Oiseau from "@/components/Oiseau";

export default Vue.extend({
  name: "Home",
  components: {
    Input,
    ChoixTypeDeplacement,
    ButtonCustom,
    Oiseau
  },
  methods: {
    launch() {
      this.$router.push({ name: "type-destination" });
    },
  },
});
</script>

<style scoped>
#container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 0.8fr 1.2fr;
  gap: 0px 0px;
  grid-template-areas:
    ". canari ."
    ". canari ."
    ". launcher .";
}

#canari {
  grid-area: canari;
}

#launcher {
  grid-area: launcher;
}

#launcher {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  align-items: center;
}

.depart:nth-child(1) {
  order: 0;
  margin-bottom: 10px;
  flex: 0 1 auto;
  align-self: auto;
}

.arrive:nth-child(2) {
  order: 0;
  margin-bottom: 50px;
  flex: 0 1 auto;
  align-self: auto;
}
</style>
