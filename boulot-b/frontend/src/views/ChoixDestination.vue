<template>
  <Container>
    <template #question >
      <div id="launcher">
        <Input @blur="onBlur" :error="error.depart" v-model="depart" class="depart" placeholder="Point de départ..." />
        <Input :error="error.arrive" v-model="arrive" class="arrive" placeholder="Point d'arrivée..." />
        <ButtonCustom @click="launch" text="C'est parti !" color="blue" />
      </div>
    </template>
    <template #canari>
      <Oiseau :message="message"/>
    </template>
    <img id="nuage1" src="@/assets/nuages_svg/nuage3.svg" alt="nuage">
    <img id="nuage2" src="@/assets/nuages_svg/nuage2.svg" alt="nuage">
    <img id="nuage3" src="@/assets/nuages_svg/nuage1.svg" alt="nuage">
    <img id="nuage4" src="@/assets/nuages_svg/nuage3.svg" alt="nuage">
    <img id="nuage5" src="@/assets/nuages_svg/nuage1.svg" alt="nuage">

    <template #stepper>
      <Stepper :actif=actif />
    </template>
  </Container>

</template>

<script>
import ChoixTypeDeplacement from "./ChoixTypeDeplacement";
import Input from "../components/Input.vue";
import ButtonCustom from "../components/ButtonCustom.vue";
import Container from "@/views/Container";
import Stepper from "@/components/Stepper";
import Oiseau from "@/components/Oiseau";

export default {
  choice: "path",
  name: "ChoixDestination",
  data() {
    return {
      depart: undefined,
      arrive: undefined,
      message: "Très bien, d’où pars-tu ?",
      error: {depart: false, arrive: false}
    }
  },
  props: {
   actif: Number
  },
  components: {
    Container,
    Stepper,
    Input,
    ChoixTypeDeplacement,
    ButtonCustom,
    Oiseau
  },
  methods: {
    onBlur(value) {
      if (value) {
        this.message = "Okay, et quelle est ta destination ?"
      }
    },
    launch() {
      if (!this.depart || !this.arrive) {
        this.error.arrive = !this.arrive;
        this.error.depart = !this.depart;
        this.message = "Je ne peux t'aider si tu ne me dis pas où tu veux aller, mon ami"
        return
      }
      this.message = "Allons-y !"
      setTimeout(() => {
        this.$root.$data.setActif(this.actif +1)
      }, 1500)
    },
  },
};
</script>

<style scoped>

#launcher {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  align-items: center;
}

.depart {
  order: 0;
  margin-bottom: 10px;
  flex: 0 1 auto;
  align-self: auto;
}

.arrive {
  order: 0;
  margin-bottom: 50px;
  flex: 0 1 auto;
  align-self: auto;
}
#nuage1 {
  position: absolute;
  top: 60%;
  left: -6%;
  width: 25%;
}
#nuage2 {
  position: absolute;
  top: 55%;
  left: 20%;
  width: 8%;
}
#nuage3 {
  position: absolute;
  top: 30%;
  right: 10%;
  width: 15%;
}
#nuage4 {
  position: absolute;
  bottom: 8%;
  right: -12%;
  width: 50%;
}
#nuage5 {
  position: absolute;
  bottom: -6%;
  left: 25%;
  width: 15%;
}
</style>
