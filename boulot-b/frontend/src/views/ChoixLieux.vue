<template>
  <Container>
    <template #question >
      <Question>
        <Checkbox v-model="resto"  color="yellow" >Restaurent</Checkbox>
        <Checkbox v-model="bar" color="blue" >Bar</Checkbox>
        <Checkbox v-model="boulangerie" color="yellow" >Boulangerie</Checkbox>
        <Checkbox v-model="cinema" color="blue" >Cinéma</Checkbox>
        <ButtonCustom class="button-launch" @click="next" text="Afficher la carte !" color="blue" />
      </Question>
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
import Stepper from "@/components/Stepper";
import Question from "@/components/Question";
import Checkbox from "@/components/Checkbox";
import ButtonCustom from "@/components/ButtonCustom";
import Oiseau from "@/components/Oiseau";

export default {
  name: "ChoixLieux",
  props: {
    actif: Number
  },
  data() {
    return {
      resto: undefined,
      bar: undefined,
      boulangerie: undefined,
      cinema: undefined
    }
  },
  methods : {
    next() {
    }
  },
  components: {
    ButtonCustom,
    Question,
    Checkbox,
    Container,
    Stepper,
    Oiseau
  }
}
</script>

<style scoped>

.button-launch {
  margin-top: 50px;
}

</style>
