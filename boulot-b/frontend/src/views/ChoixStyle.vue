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
      <Oiseau/>
    </template>
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
    nextBvd() {
      const yellow= document.getElementById("yellow_house");
      const white= document.getElementById("white_house");
      const blue= document.getElementById("blue_house");
      yellow.classList.add("bounceInDown");
      white.classList.add("bounceInDown");
      blue.classList.add("bounceInDown");
      yellow.addEventListener("animationend", () => {
        this.$root.$data.setStyle(Styles.BOULEVARDS);
        this.$router.push({name:"choix-theme" });
      });
      },
    nextRuelles() {
      const yellow = document.getElementById("yellow_house");
      yellow.classList.add("bounceInDown");
      yellow.addEventListener("animationend", () => {
        this.$root.$data.setStyle(Styles.RUELLES);
        this.$router.push({name:"choix-theme"});
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


</style>