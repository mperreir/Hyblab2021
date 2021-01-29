<template>
  <Container>
    <template #question >
      <Question  >
        <ButtonCustom @click="nextCulture" text="Culture!" color="yellow"/>
        <ButtonCustom  @click="nextNature"  text="Nature" color="blue" />
        <ButtonCustom @click="nextAlea" text="Je te laisse choisir pour moi" color="yellow" />
      </Question>
    </template>
    <template #buildings>
      <Buildings/>
    </template>
    <template #canari>
      <Oiseau message="Je te propose plusieurs thèmes pour ton trajet, lequel préfères-tu ?"/>
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
import {Themes} from "@/store";
import ChoixLieux from "@/views/ChoixLieux";

export default {
  choice: "theme",
  name: "ChoixTheme",
  props: {
    actif: Number
  },
  methods: {
    next() {
      this.$root.$data.setActif(this.actif +1)
    },
    nextAlea() {
      const tower= document.getElementById("tower");
      const arbre2= document.getElementById("second_tree");
      tower.classList.add("bounceInDown");
      arbre2.classList.add("bounceInDown");
      arbre2.addEventListener("animationend", () => {
        this.$root.$data.setTheme(Themes.ALEA);
        this.next()
      });
    },
    nextNature() {
      const arbre1= document.getElementById("first_tree");
      const arbre2= document.getElementById("second_tree");
      arbre1.classList.add("bounceInDown");
      arbre2.classList.add("bounceInDown");
      arbre2.addEventListener("animationend", () => {
        this.$root.$data.setTheme(Themes.NATURE);
        this.next()
      });
    },
    nextCulture() {
      const tower= document.getElementById("tower");
      tower.classList.add("bounceInDown");
      tower.addEventListener("animationend", () => {
        this.$root.$data.setTheme(Themes.CULTURE);
        this.next()
      });
    },
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
