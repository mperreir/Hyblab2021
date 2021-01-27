<template>
  <Container>
    <template #question >
      <Question  >
        <ButtonCustom @click="next" text="Culture!" color="yellow"/>
        <ButtonCustom  @click="next"  text="Nature" color="blue" />
        <ButtonCustom  @click="next" text="Je te laisse choisir pour moi" color="yellow" />
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
import Question from "@/components/Question";
import ButtonCustom from "@/components/ButtonCustom";
import Stepper from "@/components/Stepper";
import Oiseau from "@/components/Oiseau";

export default {
  name: "ChoixTheme",
  props: {
    actif: Number
  },
  methods: {
    next() {
      this.$router.push({name: "choix-lieux"})
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
