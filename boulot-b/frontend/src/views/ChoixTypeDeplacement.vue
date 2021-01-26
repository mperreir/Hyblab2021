<template>
  <Container>
    <template #question >
      <Question  question="Tu te déplace...">
          <ButtonCustom class="pied" text="A pied" color="yellow"/>
          <ButtonCustom class="velo"  text="A vélo" color="blue" />
      </Question>
    </template>
    <template #canari>
      canari
    </template>
    <template #stepper>
      <Stepper actif="1" />
    </template>
  </Container>
</template>

<script>
import Container from "@/views/Container"
import Question from "@/components/Question";
import ButtonCustom from "@/components/ButtonCustom";
import Stepper from "@/components/Stepper";

export default {
  name: "ChoixTypeDeplacement",
  data() {
    return {
      answers: ["A pied","A vélo"]
    }
  },
  components: {
    Question,
    Container,
    ButtonCustom,
    Stepper
  }
}
</script>

<style scoped>


.pied {
  margin-bottom: 20px;
}

</style>