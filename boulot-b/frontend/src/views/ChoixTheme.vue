<template>
  <Container>
    <template #question >
      <Question  >
        <ButtonCustom @click="nextCulture" text="Culture!" color="yellow"/>
        <ButtonCustom  @click="nextNature"  text="Nature" color="blue" />
        <ButtonCustom  @click="next" text="Je te laisse choisir pour moi" color="yellow" />
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
import {Themes} from "@/store";

export default {
  choice: "theme",
  name: "ChoixTheme",
  props: {
    actif: Number
  },
  methods: {
    next() {
      const tower= document.getElementById("tower");
      const arbre2= document.getElementById("second_tree");
      tower.classList.add("bounceInDown");
      arbre2.classList.add("bounceInDown");
      arbre2.addEventListener("animationend", () => {
        this.$root.$data.setTheme(Themes.ALEA);
        this.$router.push({name:"choix-lieux" })
      });
    },
    nextNature() {
      const arbre1= document.getElementById("first_tree");
      const arbre2= document.getElementById("second_tree");
      arbre1.classList.add("bounceInDown");
      arbre2.classList.add("bounceInDown");
      arbre2.addEventListener("animationend", () => {
        this.$root.$data.setTheme(Themes.NATURE);
        this.$router.push({name:"choix-lieux" })
      });
    },
    nextCulture() {
      const tower= document.getElementById("tower");
      tower.classList.add("bounceInDown");
      tower.addEventListener("animationend", () => {
        this.$root.$data.setTheme(Themes.CULTURE);
        this.$router.push({name:"choix-lieux" })
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
