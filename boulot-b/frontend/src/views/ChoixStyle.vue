<template>
  <Container>
    <template #question >
      <Question  >
        <ButtonCustom class="pied" text="Grands boulevards" color="yellow"/>
        <ButtonCustom class="velo"  text="Petites ruelles" color="blue" />
      </Question>
    </template>
    <template #canari>
      <Oiseau/>
    </template>
    <template #stepper>
      <Stepper :actif=2 />
    </template>
  </Container>
</template>

<script>
import Container from "@/views/Container"
import Question from "@/components/Question";
import ButtonCustom from "@/components/ButtonCustom";
import Stepper from "@/components/Stepper";
import Oiseau from "@/components/Oiseau";

export default {
  name: "ChoixStyle",
  data() {
    return {
      answers: ["A pied","A vélo"]
    }
  },
  components: {
    Question,
    Container,
    ButtonCustom,
    Stepper,
    Oiseau
  }
}
</script>

<style scoped>


</style>