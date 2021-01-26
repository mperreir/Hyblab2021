<template>
  <Container>
    <template #question >
      <Question question="Tu te déplace..." :answers="answers"/>
    </template>
    <template #canari>
      canari
    </template>
    <template #stepper>
      stepper
    </template>
  </Container>
</template>

<script>
import Container from "@/views/Container"
import Question from "@/components/Question";
export default {
  name: "ChoixTypeDeplacement",
  data() {
    return {
      answers: ["A pied","A vélo"]
    }
  },
  components: {
    Question,
    Container
  }
}
</script>

<style scoped>

</style>