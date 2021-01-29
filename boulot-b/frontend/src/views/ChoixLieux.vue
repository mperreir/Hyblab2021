<template>
  <Container>
    <template #question >
      <Question>
        <Checkbox v-model="resto"  color="yellow" >Restaurant</Checkbox>
        <Checkbox v-model="bar" color="blue" >Bar</Checkbox>
        <Checkbox v-model="boulangerie" color="yellow" >Boulangerie</Checkbox>
        <Checkbox v-model="cinema" color="blue" >Cinéma</Checkbox>
        <ButtonCustom class="button-launch" @click="next" text="Afficher la carte !" color="blue" />
      </Question>
    </template>
    <template #buildings>
      <Buildings/>
    </template>
    <template #canari>
      <Oiseau :message="message" />
    </template>
    <template #stepper>
      <Stepper :actif=actif />
    </template>
  </Container>
</template>

<script>
import Container from "@/views/Container"
import Stepper from "@/components/Stepper";
import Question from "@/components/Question";
import Checkbox from "@/components/Checkbox";
import ButtonCustom from "@/components/ButtonCustom";
import Oiseau from "@/components/Oiseau";
import Buildings from "@/components/Buildings";

export default {
  choice: "lieux",
  name: "ChoixLieux",
  props: {
    actif: Number
  },
  data() {
    return {
      message: "J’ai trouvé plusieurs lieux qui pourraient t’intéresser, ça te dit d’y passer ?",
      resto: undefined,
      bar: undefined,
      boulangerie: undefined,
      cinema: undefined
    }
  },
  methods : {
    next() {
      this.message = " Merci pour tes réponses ! Je génère ton trajet, plus que quelques secondes à patienter avant de pouvoir prendre ton envol !"
    }
  },
  components: {
    ButtonCustom,
    Question,
    Checkbox,
    Container,
    Stepper,
    Oiseau,
    Buildings
  }
}
</script>

<style scoped>

.button-launch {
  margin-top: 50px;
}

</style>
