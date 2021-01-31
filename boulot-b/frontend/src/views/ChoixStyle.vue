<template>
  <Container>
    <template #question >
      <Question  >
        <ButtonCustom @click="nextBvd" text="Grands boulevards" color="yellow"/>
        <ButtonCustom @click="nextRuelles"  text="Petites ruelles" color="blue" />
      </Question>
    </template>
    <template #buildings>
      <Buildings/>
    </template>
    <template #canari>
      <Oiseau message="Tu es plutôt .."/>
    </template>
    <img id="nuage1" src="@/assets/nuages_svg/nuage3.svg" alt="nuage"/>
    <img id="nuage2" src="@/assets/nuages_svg/nuage2.svg" alt="nuage" />
    <img id="nuage3" src="@/assets/nuages_svg/nuage3.svg" alt="nuage" />
    <img id="nuage4" src="@/assets/nuages_svg/nuage3.svg" alt="nuage" />
    <template #stepper>
      <Stepper :actif=actif />
    </template>
  </Container>
</template>

<script>
import Container from "@/views/Container"
import Question from "@/components/Question";
import ButtonCustom from "@/components/ButtonCustom";
import Stepper from "@/components/Stepper";
import Oiseau from "@/components/Oiseau";
import Buildings from "@/components/Buildings";
import {Styles} from "@/store";

export default {
  choice: "style",
  name: "ChoixStyle",
  props: {
    actif: Number
  },
  methods: {
    next() {
      this.$root.$data.setActif(this.actif +1)
    },
    nextBvd() {
      const yellow= document.getElementById("yellow_house");
      const white= document.getElementById("white_house");
      const blue= document.getElementById("blue_house");
      yellow.classList.add("bounceInDown");
      white.classList.add("bounceInDown");
      blue.classList.add("bounceInDown");
      yellow.addEventListener("animationend", () => {
        this.$root.$data.setStyle(Styles.BOULEVARDS);
        this.next()
      });
      },
    nextRuelles() {
      const yellow = document.getElementById("yellow_house");
      yellow.classList.add("bounceInDown");
      yellow.addEventListener("animationend", () => {
        this.$root.$data.setStyle(Styles.RUELLES);
        this.next();
      });
    }
  },
  components: {
    Question,
    Container,
    ButtonCustom,
    Stepper,
    Oiseau,
    Buildings
  }
}
</script>

<style scoped>
  #nuage1, #nuage2, #nuage3, #nuage4 {
    position: absolute;
    z-index: -1;
  }
  #nuage1 {
    top: 40%;
    left: -6%;
    width: 25%;
  }
  #nuage2 {
    top: 35%;
    left: 20%;
    width: 8%;
  }
  #nuage3 {
    bottom: 20%;
    right: -12%;
    width: 40%;
  }
  #nuage4 {
    bottom: -4%;
    left: -13%;
    width: 45%;
  }

</style>